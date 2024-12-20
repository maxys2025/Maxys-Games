// Variabili comuni
let questions = [];
let selectedQuestions = [];
let currentQuestionIndex = 0;

// Carica le domande dal file JSON
async function loadQuestions(game) {
  try {
    const response = await fetch('questions.json');
    const data = await response.json();
    questions = data[game];
    console.log("Domande caricate per:", game);
  } catch (error) {
    console.error("Errore nel caricamento delle domande:", error);
  }
}

// Prepara un set di domande casuali
function prepareQuestions(config) {
  const categories = Object.values(questions);
  const shuffled = categories.flat().sort(() => Math.random() - 0.5);
  selectedQuestions = shuffled.slice(0, config.randomQuestions);
}

// Mostra la prossima domanda
function nextQuestion() {
  if (currentQuestionIndex < selectedQuestions.length) {
    const question = selectedQuestions[currentQuestionIndex];
    document.getElementById('category').innerText = `Categoria: ${question.category}`;
    document.getElementById('question').innerText = question.question;
    currentQuestionIndex++;
    updateQuestionCounter();
  } else {
    endGame();
  }
}

// Aggiorna il contatore delle domande
function updateQuestionCounter() {
  document.getElementById('question-counter').innerText =
    `${currentQuestionIndex}/${selectedQuestions.length}`;
}

// Fine del gioco
function endGame() {
  document.getElementById('game-content').innerHTML = "<h2>Gioco completato!</h2>";
}
