// Configurazione dei giochi
const gameConfig = {
  domande: { categories: 5, randomQuestions: 25 },
  coppie: { categories: 1, randomQuestions: 25 },
  segreti: { categories: 1, randomQuestions: 25 },
  spaccacoppie: { categories: 1, randomQuestions: 25 }
};

let questions = [];
let selectedQuestions = [];
let currentQuestionIndex = 0;
let scores = { him: 0, her: 0 };
let currentGame = "";

// Carica le domande dal file JSON
async function loadQuestions(game) {
  try {
    const response = await fetch('questions.json');
    const data = await response.json();
    currentGame = game;
    questions = data[game];
    prepareQuestions(gameConfig[game]);
  } catch (error) {
    console.error("Errore nel caricamento delle domande:", error);
  }
}

// Prepara un set di domande casuali
function prepareQuestions(config) {
  const categories = {};

  // Raggruppa domande per categoria
  for (const category in questions) {
    categories[category] = questions[category];
  }

  // Seleziona le domande richieste
  for (const category in categories) {
    const shuffled = [...categories[category]].sort(() => Math.random() - 0.5);
    selectedQuestions.push(...shuffled.slice(0, config.randomQuestions / config.categories));
    if (selectedQuestions.length >= config.randomQuestions) break;
  }

  shuffleQuestions(); // Mescola le domande
}

// Mescola le domande
function shuffleQuestions() {
  selectedQuestions = selectedQuestions.sort(() => Math.random() - 0.5);
}

// Avvia il gioco
async function startGame(game) {
  const gameContent = document.getElementById('game-content');
  const nameInput = document.getElementById('name-input');

  if (!gameContent) {
    console.error('Elemento con ID "game-content" non trovato!');
    return;
  }

  if (game === "coppie") {
    nameInput.style.display = "block";
    return;
  }

  nameInput.style.display = "none";
  gameContent.style.display = "block";

  await loadQuestions(game);
  updateQuestionCounter();
  nextQuestion();
}

// Mostra la prossima domanda
function nextQuestion() {
  if (currentQuestionIndex < selectedQuestions.length) {
    const questionData = selectedQuestions[currentQuestionIndex];
    document.getElementById('category').innerText = `Categoria: ${questionData.category || "Generale"}`;
    document.getElementById('question').innerText = questionData.question;
    currentQuestionIndex++;
    updateQuestionCounter();
  } else {
    endGame();
  }
}

// Aggiorna il contatore delle
