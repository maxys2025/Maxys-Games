// Configurazione del Gioco delle Coppie
const couplesGameConfig = {
  category: "Conoscenza", // Categoria delle domande
  totalQuestions: 25      // Numero totale di domande
};

// Variabili globali
let score = { him: 0, her: 0 }; // Punteggio separato per Lui e Lei
let selectedQuestions = [];
let turn = "him"; // Indica di chi è il turno

// Avvia il Gioco delle Coppie
async function startCouplesGame() {
  console.log("Inizio del gioco!");
  const nameHim = document.getElementById('name-him').value || "Lui";
  const nameHer = document.getElementById('name-her').value || "Lei";

  console.log(`Giocatori: ${nameHim} e ${nameHer}`);

  // Nascondi l'input dei nomi e mostra il contenuto del gioco
  document.getElementById('name-input').style.display = 'none';
  document.getElementById('game-content').style.display = 'block';

  // Carica le domande dalla categoria specificata
  await loadQuestions('coppie');
  selectedQuestions = (questions[couplesGameConfig.category] || [])
    .sort(() => Math.random() - 0.5) // Mescola le domande
    .slice(0, couplesGameConfig.totalQuestions);

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
    const turnLabel = turn === "him" ? "Lui" : "Lei";
    document.getElementById('question').innerText = `(${turnLabel}): ${question.question}`;
  } else {
    endCouplesGame();
  }
}

// Aggiorna il contatore delle domande
function updateQuestionCounter() {
  document.getElementById('question-counter').innerText =
    `${currentQuestionIndex + 1}/${couplesGameConfig.totalQuestions}`;
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

// Termina il gioco e mostra il riepilogo
function endCouplesGame() {
  document.getElementById('game-content').style.display = 'none';
  const endGameDiv = document.getElementById('end-game');
  endGameDiv.style.display = 'block';

  const finalMessage = `
    <h2>Gioco completato!</h2>
    <p>Risultati:</p>
    <p>Lui: ${score.him} risposte corrette</p>
    <p>Lei: ${score.her} risposte corrette</p>
  `;
  document.getElementById('final-message').innerHTML = finalMessage;
}

// Riavvia il gioco
function restartGame() {
  currentQuestionIndex = 0;
  score = { him: 0, her: 0 };
  selectedQuestions = [];
  document.getElementById('question').innerText = "";
  document.getElementById('question-counter').innerText = "0/0";
  document.getElementById('score').innerText = "0";
  document.getElementById('end-game').style.display = 'none';
  document.getElementById('name-input').style.display = 'block';
}

// Collega le funzioni al contesto globale
window.startCouplesGame = startCouplesGame;
window.recordAnswer = recordAnswer;
window.restartGame = restartGame;

console.log("Modulo coppie.js caricato correttamente.");
