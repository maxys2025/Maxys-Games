// Configurazione specifica per il Gioco delle Domande
const gameConfig = {
  randomQuestions: 25 // Numero totale di domande
};

// Inizializza il gioco
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

  // Filtra le domande dalle categorie selezionate
  await loadQuestions('domande'); // Carica tutte le domande
  const filteredQuestions = selectedCategories.flatMap(category => questions[category] || []);
  
  // Prepara il set di domande casuali
  selectedQuestions = filteredQuestions.sort(() => Math.random() - 0.5).slice(0, 25);

  // Avvia il gioco
  currentQuestionIndex = 0;
  updateQuestionCounter();
  nextQuestion();
}

// Avvia il gioco quando la pagina è caricata
window.addEventListener('DOMContentLoaded', initDomandeGame);

function endGame() {
  document.getElementById('game-content').innerHTML = `
    <h2>Gioco completato!</h2>
    <button onclick="restartGame()">Ricomincia</button>
    <a href="index.html"><button>Torna alla Home</button></a>
  `;
}

function restartGame() {
  currentQuestionIndex = 0; // Reset dell'indice
  selectedQuestions = []; // Reset delle domande selezionate
  initDomandeGame(); // Riavvia il gioco
}

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
    <button onclick="restartGame()">Ricomincia</button>
    <a href="index.html"><button>Torna alla Home</button></a>
  `;

  document.getElementById('game-content').innerHTML = summaryHtml;
}
