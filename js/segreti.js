// Configurazione del Gioco Segreti Piccanti
const secretsGameConfig = {
  category: "Piccanti", // Categoria specifica
  totalQuestions: 25    // Numero di domande
};

// Avvia il Gioco Segreti Piccanti con avviso
async function startSecretsGame() {
  // Mostra l'avviso per il pubblico adulto
  const userConfirmed = confirm(
    "Attenzione: Questo gioco è per un pubblico adulto. Alcune domande sono molto dirette e potrebbero risultare provocanti. Vuoi continuare?"
  );
  
  if (!userConfirmed) {
    // Se l'utente non conferma, ritorna alla pagina principale
    window.location.href = "index.html";
    return;
  }

  console.log("Inizio del gioco Segreti Piccanti!");

  // Carica le domande dalla categoria specificata
  await loadQuestions('segreti'); // Carica dalla chiave 'segreti'
  console.log("Domande caricate:", questions);

  // Filtra le domande per la categoria "Piccanti"
  selectedQuestions = (questions[secretsGameConfig.category] || []);
  console.log("Domande filtrate per categoria:", selectedQuestions);

  if (selectedQuestions.length === 0) {
    console.error("Nessuna domanda trovata per la categoria 'Piccanti'.");
    document.getElementById('question').innerText = "Errore: Nessuna domanda trovata.";
    return;
  }

  // Mescola e seleziona le domande
  selectedQuestions = selectedQuestions.sort(() => Math.random() - 0.5).slice(0, secretsGameConfig.totalQuestions);
  console.log("Domande selezionate:", selectedQuestions);

  // Avvia il gioco con la prima domanda
  currentQuestionIndex = 0;
  updateQuestionCounter();
  showQuestion();
}

// Mostra la domanda corrente
function showQuestion() {
  if (currentQuestionIndex < selectedQuestions.length) {
    const question = selectedQuestions[currentQuestionIndex];
    document.getElementById('question').innerText = question.question;
  } else {
    endSecretsGame();
  }
}

// Aggiorna la barra di progresso
function updateQuestionCounter() {
  const progress = ((currentQuestionIndex + 1) / secretsGameConfig.totalQuestions) * 100;
  document.getElementById('progress-bar').style.width = `${progress}%`;
}

// Passa alla prossima domanda
function nextQuestion() {
  currentQuestionIndex++;
  updateQuestionCounter();
  showQuestion();
}

// Termina il gioco e mostra il riepilogo
function endSecretsGame() {
  document.getElementById('game-content').style.display = 'none';
  const endGameDiv = document.getElementById('end-game');
  endGameDiv.style.display = 'block';

  const finalMessage = `
    <h2>Gioco completato!</h2>
    <p>Rinizia il gioco per scoprire altre nuove domande! Rispondi a tutte!</p>
  `;
  document.getElementById('final-message').innerHTML = finalMessage;
}

// Riavvia il gioco
function restartGame() {
  currentQuestionIndex = 0;
  selectedQuestions = [];
  document.getElementById('question').innerText = "";
  document.getElementById('progress-bar').style.width = "0%";
  document.getElementById('end-game').style.display = 'none';
  startSecretsGame();
}

// Avvia automaticamente il gioco all'apertura della pagina
window.addEventListener('DOMContentLoaded', startSecretsGame);

// Collega le funzioni al contesto globale
window.nextQuestion = nextQuestion;
window.restartGame = restartGame;

console.log("Modulo segreti.js caricato correttamente.");
