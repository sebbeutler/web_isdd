let currentScore = 0;
let questionCount = 0;
const totalQuestions = 5;

function getQuestion() {
    if (questionCount >= totalQuestions) {
        displayFinalScore();
        return;
    }

    const button = document.getElementById('getQuestionBtn');
    button.style.display = 'none'; // Hide the button
    const progressBar = document.querySelector('#progress');
    progressBar.style.display = 'flex';

    fetch('https://the-trivia-api.com/api/questions?categories=science&limit=1')
        .then(response => response.json())
        .then(data => {
            const trivia = data[0];
            document.getElementById('question').textContent = trivia.question;
            const options = trivia.incorrectAnswers;
            options.push(trivia.correctAnswer);
            options.sort(() => Math.random() - 0.5); // Shuffle options
            displayOptions(options, trivia.correctAnswer);
            document.getElementById('result').textContent = '';
            // Optionally re-display the button here if needed immediately after displaying options
        })
        .catch(error => {
            console.error('Error fetching the trivia question:', error);
            document.getElementById('result').textContent = 'Failed to load question, please try again.';
            button.style.display = 'block'; // Show the button again if there is an error
        });
}

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

function submitAnswer(userAnswer, correctAnswer) {
    const optionsButtons = document.querySelectorAll('#options button');
    optionsButtons.forEach(button => {
        button.disabled = true; // Disable all answer buttons
        if (button.textContent === correctAnswer) {
            button.style.backgroundColor = '#99cf99'; // Light green for correct
        } else {
            button.style.backgroundColor = '#ed5f5f'; // Light red for incorrect
        }
    });

    const progressDivs = document.querySelectorAll('#progress > div > div');
    let fillColor = userAnswer === correctAnswer ? '#4CAF50' : '#F44336';
    document.getElementById('result').textContent = userAnswer === correctAnswer ? 'Correct!' : 'Incorrect! The correct answer was: ' + correctAnswer;
    document.getElementById('result').style.color = userAnswer === correctAnswer ? '#1B5E20' : '#D32F2F';
    progressDivs[questionCount].style.backgroundColor = fillColor;
    progressDivs[questionCount].style.width = '100%';
    currentScore += userAnswer === correctAnswer ? 1 : 0;
    questionCount++;
    setTimeout(() => {
        if (questionCount < totalQuestions) {
            getQuestion();
            optionsButtons.forEach(button => {
                button.disabled = false; // Re-enable for next question
                button.classList.remove('show'); // Reset class for animation
                button.style.backgroundColor = ''; // Reset background color
            });
        } else {
            displayFinalScore();
        }
    }, 2000); // Delay before next question
}

function displayFinalScore() {
    document.getElementById('finalScore').textContent = `Score: ${currentScore} / ${totalQuestions}`;
    document.getElementById('finalScore').classList.remove('hidden');
    const restartButton = document.getElementById('getQuestionBtn');
    restartButton.textContent = 'Restart';
    restartButton.style.display = 'block'; // Ensure the button is visible for restarting the game
    // Reset progress bars for restart
    document.querySelectorAll('#progress > div > div').forEach(div => {
        div.style.width = '0'; // Reset progress animation
        div.style.backgroundColor = 'transparent';
    });
    currentScore = 0; // Reset score for restart
    questionCount = 0; // Reset question count for restart
}