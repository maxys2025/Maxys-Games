// Configurazione del Gioco Segreti Piccanti
const secretsGameConfig = {
  category: "Segreti Piccanti", // Categoria specifica
  totalQuestions: 25 // Numero di domande
};

// Variabili globali
let score = 0;
let playerName = "Giocatore";

// Avvia il Gioco Segreti Piccanti
async function startSecretsGame() {
  console.log("Inizio del gioco Segreti Piccanti!");

  // Ottieni il nome del giocatore
  playerName = document.getElementById('name-player').value || "Giocatore";
  console.log(`Giocatore: ${playerName}`);

  // Nascondi l'input del nome e mostra il contenuto del gioco
  document.getElementById('name-input').style.display = 'none';
  document.getElementById('game-content').style.display = 'block';

  // Carica le domande dalla categoria specificata
  await loadQuestions('segreti');
  selectedQuestions = (questions[secretsGameConfig.category] || [])
    .sort(() => Math.random() - 0.5) // Mescola le domande
    .slice(0, secretsGameConfig.totalQuestions); // Seleziona il numero desiderato di domande

  console.log("Domande selezionate:", selectedQuestions);

  // Mostra la prima domanda
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

// Aggiorna il contatore delle domande
function updateQuestionCounter() {
  const progress = ((currentQuestionIndex + 1) / secretsGameConfig.totalQuestions) * 100;
  document.getElementById('progress-bar').style.width = `${progress}%`;
}

// Registra la risposta
function recordAnswer(isCorrect) {
  if (isCorrect) {
    score++;
    document.getElementById('score').innerText = `Punteggio: ${score}`;
  }
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
    <p>${playerName}, hai totalizzato ${score} risposte corrette su ${secretsGameConfig.totalQuestions}.</p>
  `;
  document.getElementById('final-message').innerHTML = finalMessage;
}

// Riavvia il gioco
function restartGame() {
  currentQuestionIndex = 0;
  score = 0;
  selectedQuestions = [];
  playerName = "Giocatore";
  document.getElementById('question').innerText = "";
  document.getElementById('progress-bar').style.width = "0%";
  document.getElementById('score').innerText = "0";
  document.getElementById('end-game').style.display = 'none';
  document.getElementById('name-input').style.display = 'block';
}

// Collega le funzioni al contesto globale
window.startSecretsGame = startSecretsGame;
window.recordAnswer = recordAnswer;
window.restartGame = restartGame;

console.log("Modulo segreti.js caricato correttamente.");
