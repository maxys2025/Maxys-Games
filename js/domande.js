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

