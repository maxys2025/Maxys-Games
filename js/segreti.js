// Configurazione del Gioco Segreti Piccanti
const secretsGameConfig = {
  category: "Segreti Piccanti", // Categoria specifica
  totalQuestions: 25 // Numero di domande
};


// Avvia il Gioco Segreti Piccanti
async function startSecretsGame() {
  console.log("Inizio del gioco Segreti Piccanti!");

document.getElementById('game-content').style.display = 'block';

  // Filtra le domande dalle categorie selezionate
  await loadQuestions('domande'); // Carica tutte le domande
  const filteredQuestions = selectedCategories.flatMap(category => questions[category] || []);
  
  // Prepara il set di domande casuali
  selectedQuestions = filteredQuestions.sort(() => Math.random() - 0.5).slice(0, gameConfig.randomQuestions);

  // Avvia il gioco
  currentQuestionIndex = 0;
  updateQuestionCounter();
  nextQuestion();
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
    <button onclick="restartGame()">Ricomincia</button>
    <a href="index.html"><button>Torna alla Home</button></a>
  `;

  document.getElementById('game-content').innerHTML = summaryHtml;
}

// Riavvia il gioco
function restartGame() {
  currentQuestionIndex = 0; // Reset dell'indice
  selectedQuestions = []; // Reset delle domande selezionate
  document.getElementById('game-content').style.display = 'block';
}

// Nascondi il contenuto del gioco quando la pagina è caricata
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('game-content').style.display = 'block';
});
