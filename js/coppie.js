// Coppie.js - Gioco delle Coppie
import { loadQuestions } from "./shared.js";

class CouplesGame {
  constructor() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.selectedQuestions = [];
    this.config = {
      category: "Conoscenza",
      totalQuestions: 25
    };
  }

  async start() {
    const nameHim = document.getElementById('name-him').value || "Lui";
    const nameHer = document.getElementById('name-her').value || "Lei";

    console.log(`Giocatori: ${nameHim} e ${nameHer}`);
    document.getElementById('name-input').style.display = 'none';
    document.getElementById('game-content').style.display = 'block';

    await loadQuestions('coppie');
    this.selectedQuestions = (questions[this.config.category] || [])
      .sort(() => Math.random() - 0.5)
      .slice(0, this.config.totalQuestions);

    this.nextQuestion();
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.selectedQuestions.length) {
      const question = this.selectedQuestions[this.currentQuestionIndex];
      document.getElementById('question').innerText = question.question;
      this.currentQuestionIndex++;
    } else {
      this.endGame();
    }
  }

  recordAnswer(isCorrect) {
    if (isCorrect) {
      this.score++;
      document.getElementById('score').innerText = `Punteggio: ${this.score}`;
    }
    this.nextQuestion();
  }

  endGame() {
    document.getElementById('game-content').style.display = 'none';
    const endGameDiv = document.getElementById('end-game');
    endGameDiv.style.display = 'block';

    let message = "";
    if (this.score <= 10) {
      message = "Forse dovreste conoscervi meglio!";
    } else if (this.score <= 20) {
      message = "Vi conoscete abbastanza bene!";
    } else {
      message = "Siete un duo perfetto!";
    }

    document.getElementById('final-message').innerText = `Punteggio finale: ${this.score}/${this.config.totalQuestions}. ${message}`;
  }

  restart() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.selectedQuestions = [];
    document.getElementById('score').innerText = "Punteggio: 0";
    document.getElementById('end-game').style.display = 'none';
    document.getElementById('name-input').style.display = 'block';
  }
}

const game = new CouplesGame();

// Collega i pulsanti agli eventi
document.getElementById('start-game').addEventListener('click', () => game.start());
document.getElementById('correct-btn').addEventListener('click', () => game.recordAnswer(true));
document.getElementById('wrong-btn').addEventListener('click', () => game.recordAnswer(false));
document.getElementById('restart-btn').addEventListener('click', () => game.restart());

console.log("Modulo coppie.js caricato correttamente.");
