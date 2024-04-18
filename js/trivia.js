// Initialisation des variables de score et de comptage des questions
let currentScore = 0;
let questionCount = 0;
const totalQuestions = 5;

// Fonction pour obtenir une question
function getQuestion() {
    // Si le nombre de questions atteint le total, affiche le score final
    if (questionCount >= totalQuestions) {
        displayFinalScore();
        return;
    }

    const button = document.getElementById('getQuestionBtn');
    button.style.display = 'none'; // Cache le bouton
    const progressBar = document.querySelector('#progress');
    progressBar.style.display = 'flex';

    // Appel à l'API pour obtenir une question
    fetch('https://the-trivia-api.com/api/questions?categories=science&limit=1')
        .then(response => response.json())
        .then(data => {
            const trivia = data[0];
            document.getElementById('question').textContent = trivia.question;
            const options = trivia.incorrectAnswers;
            options.push(trivia.correctAnswer);
            options.sort(() => Math.random() - 0.5); // Mélange les options
            displayOptions(options, trivia.correctAnswer);
            document.getElementById('result').textContent = '';
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de la question de trivia:', error);
            document.getElementById('result').textContent = 'Échec du chargement de la question, veuillez réessayer.';
            button.style.display = 'block'; // Réaffiche le bouton en cas d'erreur
        });
}

// Fonction pour afficher les options de réponse
function displayOptions(options, correctAnswer) {
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = function () { submitAnswer(option, correctAnswer); };
        optionsContainer.appendChild(button);
        setTimeout(() => {
            button.classList.add('show');
        }, 10);
    });
}

// Fonction pour soumettre une réponse
function submitAnswer(userAnswer, correctAnswer) {
    const optionsButtons = document.querySelectorAll('#options button');
    optionsButtons.forEach(button => {
        button.disabled = true; // Désactive tous les boutons de réponse
        if (button.textContent === correctAnswer) {
            button.style.backgroundColor = '#99cf99'; // Vert clair pour correct
        } else {
            button.style.backgroundColor = '#ed5f5f'; // Rouge clair pour incorrect
        }
    });

    const progressDivs = document.querySelectorAll('#progress > div > div');
    let fillColor = userAnswer === correctAnswer ? '#4CAF50' : '#F44336';
    document.getElementById('result').textContent = userAnswer === correctAnswer ? 'Correct!' : 'Incorrect! La bonne réponse était: ' + correctAnswer;
    document.getElementById('result').style.color = userAnswer === correctAnswer ? '#1B5E20' : '#D32F2F';
    progressDivs[questionCount].style.backgroundColor = fillColor;
    progressDivs[questionCount].style.width = '100%';
    currentScore += userAnswer === correctAnswer ? 1 : 0;
    questionCount++;
    setTimeout(() => {
        if (questionCount < totalQuestions) {
            getQuestion();
            optionsButtons.forEach(button => {
                button.disabled = false; // Réactive pour la prochaine question
                button.classList.remove('show'); // Réinitialise la classe pour l'animation
                button.style.backgroundColor = ''; // Réinitialise la couleur de fond
            });
        } else {
            displayFinalScore();
        }
    }, 2000); // Délai avant la prochaine question
}

// Fonction pour afficher le score final
function displayFinalScore() {
    document.getElementById('finalScore').textContent = `Score: ${currentScore} / ${totalQuestions}`;
    document.getElementById('finalScore').classList.remove('hidden');
    const restartButton = document.getElementById('getQuestionBtn');
    restartButton.textContent = 'Redémarrer';
    restartButton.style.display = 'block'; // Assure que le bouton est visible pour redémarrer le jeu
    // Réinitialise les barres de progression pour le redémarrage
    document.querySelectorAll('#progress > div > div').forEach(div => {
        div.style.width = '0'; // Réinitialise l'animation de progression
        div.style.backgroundColor = 'transparent';
    });
    currentScore = 0; // Réinitialise le score pour le redémarrage
    questionCount = 0; // Réinitialise le comptage des questions pour le redémarrage
}