// Configurazione del Gioco delle Coppie
const couplesGameConfig = {
  categories: ["Pref", "Esp", "Pic", "Boh", "Cur"], // Sottocategorie
  questionsPerCategory: 6, // Numero di domande per sottocategoria
  totalQuestions: 30 // Numero totale di domande
};

// Variabili globali
let score = { him: 0, her: 0 }; // Punteggio separato per i due giocatori
let turn = "him"; // Indica di chi è il turno
let nameHim = "Lui"; // Nome di Lui (personalizzato)
let nameHer = "Lei"; // Nome di Lei (personalizzato)

// Avvia il Gioco delle Coppie
async function startCouplesGame() {
  console.log("Inizio del gioco!");

  // Ottieni i nomi inseriti dai giocatori
  nameHim = document.getElementById('name-him').value || "Lui";
  nameHer = document.getElementById('name-her').value || "Lei";

  console.log(`Giocatori: ${nameHim} e ${nameHer}`);

  // Nascondi l'input dei nomi e mostra il contenuto del gioco
  document.getElementById('name-input').style.display = 'none';
  document.getElementById('game-content').style.display = 'block';

  // Carica le domande dalle categorie specificate
  await loadQuestions('coppie');
  console.log("Domande caricate:", questions);

  if (!questions) {
    console.error("Errore: le domande non sono state caricate.");
    document.getElementById('question').innerHTML = "Errore: impossibile caricare le domande.";
    return;
  }

  // Seleziona le domande da ciascuna categoria
  selectedQuestions = couplesGameConfig.categories.flatMap(category => {
    const questionsInCategory = questions[category] || [];
    return questionsInCategory.sort(() => Math.random() - 0.5).slice(0, couplesGameConfig.questionsPerCategory);
  });

  if (selectedQuestions.length === 0) {
    console.error("Errore: nessuna domanda trovata.");
    document.getElementById('question').innerHTML = "Errore: nessuna domanda trovata.";
    return;
  }

  // Mescola le domande selezionate
  selectedQuestions = selectedQuestions.sort(() => Math.random() - 0.5);

  console.log("Domande selezionate:", selectedQuestions);

  // Mostra la prima domanda
  currentQuestionIndex = 0;
  turn = "him"; // Inizia con Lui
  updateQuestionCounter();
  showQuestion();
}

// Mostra la domanda corrente e il turno
function showQuestion() {
  if (currentQuestionIndex < selectedQuestions.length) {
    const question = selectedQuestions[currentQuestionIndex];
    const turnLabel = turn === "him" 
      ? `<span class="highlight">${nameHim}</span>` 
      : `<span class="highlight">${nameHer}</span>`;
    document.getElementById('question').innerHTML = `
      <p>Domanda per ${turnLabel}</p>
      <p class="subcategory">${question.category}</p>
      <p>${question.question}</p>
    `;
  } else {
    endCouplesGame();
  }
}

// Aggiorna la barra di progresso
function updateQuestionCounter() {
  const progress = ((currentQuestionIndex + 1) / couplesGameConfig.totalQuestions) * 100;
  document.getElementById('progress-bar').style.width = `${progress}%`;
}

// Registra la risposta e alterna i turni
function recordAnswer(isCorrect) {
  if (isCorrect) {
    score[turn]++;
  }

  // Passa al turno successivo
  turn = turn === "him" ? "her" : "him";
  currentQuestionIndex++;
  updateQuestionCounter();
  showQuestion();
}

// Genera una frase personalizzata basata sul punteggio
function getPersonalizedMessage(score) {
  if (score <= 5) {
    return "Ci sono ancora delle cose che devi scoprire!";
  } else if (score <= 12) {
    return "Hai fatto un ottimo lavoro!";
  } else {
    return "Conosci il tuo partner alla perfezione!";
  }
}

// Termina il gioco e mostra il riepilogo
function endCouplesGame() {
  document.getElementById('game-content').style.display = 'none';
  const endGameDiv = document.getElementById('end-game');
  endGameDiv.style.display = 'block';

  const messageHim = getPersonalizedMessage(score.him);
  const messageHer = getPersonalizedMessage(score.her);

  const finalMessage = `
    <h2>Gioco completato!</h2>
    <p>Risultati:</p>
    <p><span class="highlight">${nameHim}</span>: ${score.him} risposte corrette. ${messageHim}</p>
    <p><span class="highlight">${nameHer}</span>: ${score.her} risposte corrette. ${messageHer}</p>
  `;
  document.getElementById('final-message').innerHTML = finalMessage;
}

// Riavvia il gioco
function restartGame() {
  currentQuestionIndex = 0;
  score = { him: 0, her: 0 };
  selectedQuestions = [];
  nameHim = "Lui";
  nameHer = "Lei";
  document.getElementById('question').innerText = "";
  document.getElementById('progress-bar').style.width = "0%";
  document.getElementById('end-game').style.display = 'none';
  document.getElementById('name-input').style.display = 'block';
}

// Collega le funzioni al contesto globale
window.startCouplesGame = startCouplesGame;
window.recordAnswer = recordAnswer;
window.restartGame = restartGame;

console.log("Modulo coppie.js caricato correttamente.");
