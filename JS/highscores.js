const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScores.sort((a, b) => a.score - b.score);

highScoresList.innerHTML = highScores
    .map(score => {
        return `<li class="high-score">${score.name}: ${score.score}</li>`; 
    })
    .join('');

const style = document.createElement('style');
style.innerHTML = `
    .high-score:hover {
        transform: scale(1.025);
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);
