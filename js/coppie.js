// Variabili globali per tenere traccia delle risposte di Lui e Lei
let himScore = 0;
let herScore = 0;
let himCorrect = 0;
let herCorrect = 0;
let himWrong = 0;
let herWrong = 0;
let currentPlayer = 'him'; // Per determinare chi risponde, 'him' o 'her'

// Configurazione del Gioco delle Coppie
const couplesGameConfig = {
  category: "Conoscenza", // Categoria delle domande
  totalQuestions: 25      // Numero totale di domande
};

// Carica le domande da un file JSON
async function loadQuestions() {
  try {
    const response = await fetch('questions.json');
    const data = await response.json();
    questions = data.questions;
    shuffleQuestions();
  } catch (error) {
    console.error("Errore nel caricamento delle domande:", error);
  }
}

// Mescola le domande
function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
}

// Funzione per avviare il gioco
async function startCouplesGame() {
  console.log("Inizio del gioco!"); // Debug
  const nameHim = document.getElementById('name-him').value || "Lui";
  const nameHer = document.getElementById('name-her').value || "Lei";

  console.log(`Giocatori: ${nameHim} e ${nameHer}`); // Debug

  // Nascondi l'input dei nomi e mostra il contenuto del gioco
  document.getElementById('name-input').style.display = 'none';
  document.getElementById('game-content').style.display = 'block';

  // Carica le domande dalla categoria specificata
  await loadQuestions('coppie');
  selectedQuestions = (questions[couplesGameConfig.category] || [])
    .sort(() => Math.random() - 0.5)
    .slice(0, couplesGameConfig.totalQuestions);

  console.log("Domande selezionate:", selectedQuestions); // Debug

  // Mostra la prima domanda
  nextQuestion();
}

// Funzione per mostrare la prossima domanda
function nextQuestion() {
  if (currentQuestionIndex < selectedQuestions.length) {
    const question = selectedQuestions[currentQuestionIndex];
    document.getElementById('question').innerText = question.question;
    currentQuestionIndex++;
    updateQuestionCounter();
  } else {
    endCouplesGame();
  }
}

// Aggiorna il contatore delle domande
function updateQuestionCounter() {
  document.getElementById('question-counter').innerText =
    `${currentQuestionIndex}/${couplesGameConfig.totalQuestions}`;
}

// Funzione per registrare la risposta e alternare il giocatore
function recordAnswer(isCorrect) {
  if (currentPlayer === 'him') {
    if (isCorrect) {
      himCorrect++;
      himScore++;
      document.getElementById('score-him').innerText = `Punteggio di Lui: ${himScore}`;
    } else {
      himWrong++;
    }
    currentPlayer = 'her'; // Dopo che Lui ha risposto, tocca a Lei
  } else {
    if (isCorrect) {
      herCorrect++;
      herScore++;
      document.getElementById('score-her').innerText = `Punteggio di Lei: ${herScore}`;
    } else {
      herWrong++;
    }
    currentPlayer = 'him'; // Dopo che Lei ha risposto, tocca a Lui
  }

  nextQuestion();
}

// Funzione per terminare il gioco e mostrare il riepilogo
function endCouplesGame() {
  document.getElementById('game-content').style.display = 'none';
  const endGameDiv = document.getElementById('end-game');
  endGameDiv.style.display = 'block';

  let message = "";
  if (himScore <= 10 && herScore <= 10) {
    message = "Forse dovreste conoscervi meglio!";
  } else if ((himScore <= 20 && herScore <= 20)) {
    message = "Vi conoscete abbastanza bene!";
  } else {
    message = "Siete un duo perfetto!";
  }

  document.getElementById('final-message').innerText = `Punteggio finale: ${himScore + herScore}/${couplesGameConfig.totalQuestions * 2}. ${message}`;
  document.getElementById('final-score-him').innerText = `Lui ha dato ${himCorrect} risposte corrette e ${himWrong} sbagliate.`;
  document.getElementById('final-score-her').innerText = `Lei ha dato ${herCorrect} risposte corrette e ${herWrong} sbagliate.`;
}

// Riavvia il gioco
function restartGame() {
  currentQuestionIndex = 0;
  himScore = 0;
  herScore = 0;
  himCorrect = 0;
  herCorrect = 0;
  himWrong = 0;
  herWrong = 0;
  selectedQuestions = [];
  document.getElementById('score-him').innerText = "Punteggio di Lui: 0";
  document.getElementById('score-her').innerText = "Punteggio di Lei: 0";
  document.getElementById('end-game').style.display = 'none';
  document.getElementById('name-input').style.display = 'block';
}

// Collega i pulsanti agli eventi
window.startCouplesGame = startCouplesGame;
window.recordAnswer = recordAnswer;
window.restartGame = restartGame;

console.log("Modulo coppie.js caricato correttamente.");
