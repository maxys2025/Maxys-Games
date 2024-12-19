// Configurazione giochi
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
let currentGame = ""; // Indica il gioco corrente

// Carica le domande da un file JSON
async function loadQuestions(game) {
  try {
    const response = await fetch('questions.json');
    const data = await response.json();
    currentGame = game;

    // Prepara le domande in base al gioco
    questions = data[game];
    prepareQuestions(gameConfig[game]);
  } catch (error) {
    console.error("Errore nel caricamento delle domande:", error);
  }
}

// Prepara un set di domande casuali per ogni categoria
function prepareQuestions(config) {
  const categories = {}; // Oggetto per raggruppare le domande per categoria

  // Raggruppa le domande per categoria
  for (const category in questions) {
    categories[category] = questions[category];
  }

  // Estrai domande casuali da ogni categoria
  for (const category in categories) {
    const shuffled = [...categories[category]].sort(() => Math.random() - 0.5); // Mescola
    selectedQuestions.push(...shuffled.slice(0, config.randomQuestions / config.categories));

    if (selectedQuestions.length >= config.randomQuestions) {
      break; // Termina quando raggiungiamo il numero richiesto
    }
  }

  shuffleQuestions(); // Mescola tutte le domande selezionate
}

// Mescola le domande
function shuffleQuestions() {
  selectedQuestions = selectedQuestions.sort(() => Math.random() - 0.5);
}

// Avvia il gioco
async function startGame(game) {
  const nameHim = document.getElementById('name-him')?.value || "Lui";
  const nameHer = document.getElementById('name-her')?.value || "Lei";

  if (game === "coppie" || game === "segreti" || game === "spaccacoppie") {
    document.getElementById('label-him').innerText = nameHim;
    document.getElementById('label-her').innerText = nameHer;
  }

  document.getElementById('name-input').style.display = "none";
  document.getElementById('game-content').style.display = "block";

  await loadQuestions(game); // Carica le domande e prepara il set
  updateQuestionCounter(); // Aggiorna il contatore
  nextQuestion(); // Mostra la prima domanda
}

// Mostra la prossima domanda
function nextQuestion() {
  if (currentQuestionIndex < selectedQuestions.length) {
    const questionData = selectedQuestions[currentQuestionIndex];
    document.getElementById('category').innerText = `Categoria: ${questionData.category || "Generale"}`;
    document.getElementById('question').innerText = questionData.question;
    currentQuestionIndex++;
    updateQuestionCounter(); // Aggiorna il contatore
  } else {
    endGame(); // Termina il gioco e calcola il vincitore
  }
}

// Aggiorna il contatore delle domande
function updateQuestionCounter() {
  const counterElement = document.getElementById('question-counter');
  counterElement.innerText = `${currentQuestionIndex}/${selectedQuestions.length}`;
}

// Aggiorna il punteggio e la barra di progresso (solo per coppie)
function updateScore(player) {
  if (currentGame === "coppie") {
    scores[player]++;
    const progressBar = document.getElementById(`progress-${player}`);
    const progress = (scores[player] / selectedQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
  }

  // Mostra la prossima domanda o termina il gioco
  nextQuestion();
}

// Dichiara il vincitore
function endGame() {
  let message = "Gioco completato!";

  if (currentGame === "coppie") {
    const himScore = scores.him;
    const herScore = scores.her;

    if (himScore > herScore) {
      message = `${document.getElementById('label-him').innerText} vince con ${himScore} risposte corrette!`;
    } else if (herScore > himScore) {
      message = `${document.getElementById('label-her').innerText} vince con ${herScore} risposte corrette!`;
    } else {
      message = "È un pareggio! Entrambi avete dato lo stesso numero di risposte corrette.";
    }
  }

  document.getElementById('question-container').innerHTML = 
    `<h2 class="winner-message">${message}</h2>`;
  disableButtons();
}

// Disabilita i pulsanti dopo il termine del gioco
function disableButtons() {
  document.querySelectorAll('button').forEach(button => button.disabled = true);
}
