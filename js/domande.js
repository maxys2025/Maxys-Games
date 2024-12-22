// Configurazione specifica per il Gioco delle Domande
const gameConfig = {
  totalQuestions: 30 // Numero totale di domande
};

// Avvio del gioco con la selezione delle categorie
async function startGameWithCategories() {
  // Raccogli le categorie selezionate
  const form = document.getElementById('category-form');
  const selectedCategories = Array.from(form.elements['category'])
    .filter(input => input.checked)
    .map(input => input.value);

  if (selectedCategories.length === 0) {
    alert("Seleziona almeno una categoria per iniziare il gioco.");
    return;
  }

  // Nascondi la selezione delle categorie e mostra il contenuto del gioco
  document.getElementById('category-selection').style.display = 'none';
  document.getElementById('game-content').style.display = 'block';

  // Carica le domande dalla categoria 'domande'
  await loadQuestions('domande'); // Carica tutte le domande

  // Dividi equamente le domande tra le categorie selezionate
  const questionsPerCategory = Math.floor(gameConfig.totalQuestions / selectedCategories.length);
  selectedQuestions = selectedCategories.flatMap(category => {
    const questionsInCategory = questions[category] || [];
    return questionsInCategory.sort(() => Math.random() - 0.5).slice(0, questionsPerCategory);
  });

  // Se il numero totale di domande è inferiore a quello richiesto, aggiungi altre domande dalle categorie scelte
  while (selectedQuestions.length < gameConfig.totalQuestions) {
    const randomCategory = selectedCategories[Math.floor(Math.random() * selectedCategories.length)];
    const extraQuestions = (questions[randomCategory] || []).filter(q => !selectedQuestions.includes(q));
    if (extraQuestions.length > 0) {
      selectedQuestions.push(extraQuestions[Math.floor(Math.random() * extraQuestions.length)]);
    }
  }

  // Mescola le domande selezionate
  selectedQuestions = selectedQuestions.sort(() => Math.random() - 0.5);

  // Avvia il gioco
  currentQuestionIndex = 0;
  updateQuestionCounter();
  nextQuestion();
}

// Mostra la prossima domanda
function nextQuestion() {
  if (currentQuestionIndex < selectedQuestions.length) {
    const question = selectedQuestions[currentQuestionIndex];
    document.getElementById('category').innerText = question.category; // Mostra la categoria
    document.getElementById('question').innerText = question.question;
    currentQuestionIndex++;
    updateQuestionCounter();
  } else {
    endGame();
  }
}

// Aggiorna la barra di progresso
function updateQuestionCounter() {
  const progress = ((currentQuestionIndex + 1) / gameConfig.totalQuestions) * 100;
  document.getElementById('progress-bar').style.width = `${progress}%`;
}

// Fine del gioco e riepilogo
function endGame() {
  let categoriesCount = {};

  // Conta le domande per categoria
  selectedQuestions.forEach(question => {
    categoriesCount[question.category] = (categoriesCount[question.category] || 0) + 1;
  });

  let summaryHtml = '<h2>Gioco completato!</h2><p>Riepilogo:</p><ul>';
  for (const [category, count] of Object.entries(categoriesCount)) {
    summaryHtml += `<li>${category}: ${count} domande</li>`;
  }
  summaryHtml += '</ul>';

  summaryHtml += `
    <a href="index.html"><button>Torna alla Home</button></a>
  `;

  document.getElementById('game-content').innerHTML = summaryHtml;
}

// Riavvia il gioco
function restartGame() {
  currentQuestionIndex = 0; // Reset dell'indice
  selectedQuestions = []; // Reset delle domande selezionate
  document.getElementById('game-content').style.display = 'none';
  document.getElementById('category-selection').style.display = 'block';
}

// Nascondi il contenuto del gioco quando la pagina è caricata
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('game-content').style.display = 'none';
});
