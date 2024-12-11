const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('SaveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore') || 0; 
const highScores = JSON.parse(localStorage.getItem("highScores")) || []; 

const MAX_HIGH_SCORES = 5; 

if (finalScore) {
    finalScore.innerText = `Score final : ${mostRecentScore}`;
} else {
    console.error("L'élément finalScore est introuvable");
}

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

const saveHighScore = (e) => {
    e.preventDefault(); 

    if (!username.value) {
        alert("Veuillez entrer un nom d'utilisateur.");
        return;
    }

    const score = {
        score: mostRecentScore,
        name: username.value
    };

    highScores.push(score);

    highScores.sort((a, b) => b.score - a.score);

    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem('highScores', JSON.stringify(highScores));

    console.log("Score enregistré:", score);

    window.location.assign('highscores.html');
};

saveScoreBtn.addEventListener('click', saveHighScore);
