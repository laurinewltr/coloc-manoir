const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false; // Empêche de répondre avant chargement
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Charger les questions depuis le fichier local questions.json
fetch("questions.json")
    .then(res => res.json())
    .then(loadedQuestions => {
        availableQuestions = [...loadedQuestions];
        startGame();
    })
    .catch(err => console.error("Erreur lors du chargement des questions:", err));

const CORRECT_BONUS = 10; // Score pour chaque réponse correcte
const MAX_QUESTIONS = 7;  // Le nombre total de questions

function startGame() {
    questionCounter = 0;
    score = 0;
    getNewQuestion();
}

function getNewQuestion() {
    if (questionCounter >= MAX_QUESTIONS) {
        // Redirection vers la page de fin lorsque toutes les questions sont terminées
        localStorage.setItem('mostRecentScore', score);  // Enregistrer le score final
        return window.location.assign("end.html");
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    // Mise à jour de la barre de progression
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    // Affichage des choix (uniquement 3 choix)
    choices.forEach((choice, index) => {
        const choiceNumber = index + 1;
        if (choiceNumber <= 3) {
            choice.innerText = currentQuestion["choice" + choiceNumber];
            choice.style.display = "block"; // Affiche le choix
        } else {
            choice.style.display = "none"; // Masque les choix supplémentaires
        }
    });

    availableQuestions.splice(questionIndex, 1); // Retirer la question actuelle
    acceptingAnswers = true;
}

// Gestion des clics sur les choix
choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        // Vérifie si la réponse est correcte
        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

// Incrémenter le score
function incrementScore(num) {
    score += num;
    scoreText.innerText = score;
}
