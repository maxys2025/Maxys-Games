import { loadQuestions, nextQuestion, updateQuestionCounter, endGame } from "./shared.js";

// Configurazione del Gioco delle Coppie
const couplesGameConfig = {
  category: "Conoscenza", // Categoria delle domande
  totalQuestions: 25      // Numero totale di domande
};

let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];

// Avvia il Gioco delle Coppie
async function startCouplesGame() {
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
    .slice(0, couplesGameConfig.totalQuestions); // Seleziona il numero desiderato di domande

  // Mostra la prima domanda
  nextQuestion();
}

// Registra la risposta (corretta o errata)
function recordAnswer(isCorrect) {
  if (isCorrect) {
    score++;
    document.getElementById('score').innerText = `Punteggio: ${score}`;
  }
  nextQuestion();
}

// Termina il gioco e mostra il riepilogo
function endCouplesGame() {
  document.getElementById('game-content').style.display = 'none';
  const endGameDiv = document.getElementById('end-game');
  endGameDiv.style.display = 'block';

  let message = "";
  if (score <= 10) {
    message = "Forse dovreste conoscervi meglio!";
  } else if (score <= 20) {
    message = "Vi conoscete abbastanza bene!";
  } else {
    message = "Siete un duo perfetto!";
  }

  document.getElementById('final-message').innerText = `Punteggio finale: ${score}/${couplesGameConfig.totalQuestions}. ${message}`;
}

// Riavvia il gioco
function restartGame() {
  currentQuestionIndex = 0;
  score = 0;
  selectedQuestions = [];
  document.getElementById('score').innerText = "Punteggio: 0";
  document.getElementById('end-game').style.display = 'none';
  document.getElementById('name-input').style.display = 'block';
}

// Collega i pulsanti agli eventi
document.getElementById('start-game').addEventListener('click', () => startCouplesGame());
document.getElementById('correct-btn').addEventListener('click', () => recordAnswer(true));
document.getElementById('wrong-btn').addEventListener('click', () => recordAnswer(false));
document.getElementById('restart-btn').addEventListener('click', () => restartGame());

console.log("Modulo coppie.js caricato correttamente.");
