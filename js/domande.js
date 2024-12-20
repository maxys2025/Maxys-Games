// Configurazione specifica per il Gioco delle Domande
const gameConfig = {
  randomQuestions: 25 // Numero totale di domande
};

// Inizializza il gioco
async function initDomandeGame() {
  await loadQuestions('domande'); // Carica le domande dalla categoria "domande"
  prepareQuestions(gameConfig); // Prepara il set casuale di domande
  updateQuestionCounter(); // Aggiorna il contatore
  nextQuestion(); // Mostra la prima domanda
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
