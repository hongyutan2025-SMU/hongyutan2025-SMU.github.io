// Quiz Data: Lyrics and Answers
const quizData = [
    {
        lyric: "And I was like ____, ____, ____ oh / Like ____, ____, ____ no...",
        answer: "baby",
        song: "Baby"
    },
    {
        lyric: "Is it too late now to say ____? / 'Cause I'm missing more than just your body...",
        answer: "sorry",
        song: "Sorry"
    },
    {
        lyric: "I get my ____ out down in Georgia (oh, yeah) / I get my weed from California (that's that shit)...",
        answer: "peaches",
        song: "Peaches"
    },
    {
        lyric: "If I was your ____, I'd never let you go / I can take you places you ain't never been before...",
        answer: "boyfriend",
        song: "Boyfriend"
    },
    {
        lyric: "My mama don't like you and she likes ____...",
        answer: "everyone",
        song: "Love Yourself"
    }
];

let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const lyricSnippetEl = document.getElementById('lyric-snippet');
const answerInputEl = document.getElementById('answer-input');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const feedbackMsgEl = document.getElementById('feedback-msg');
const quizContainer = document.getElementById('quiz-container');
const scoreContainer = document.getElementById('score-container');
const finalScoreEl = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

// Initialize Quiz
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    lyricSnippetEl.textContent = `"${currentQuestion.lyric}"`;
    answerInputEl.value = "";
    feedbackMsgEl.textContent = "";
    nextBtn.classList.add('hidden');
    submitBtn.disabled = false;
    answerInputEl.disabled = false;
    answerInputEl.focus();
}

// Check Answer
function checkAnswer() {
    const userAnswer = answerInputEl.value.trim().toLowerCase();
    const correctAnswer = quizData[currentQuestionIndex].answer.toLowerCase();
    
    if (userAnswer === "") {
        feedbackMsgEl.textContent = "Please enter an answer!";
        feedbackMsgEl.style.color = "red";
        return;
    }

    submitBtn.disabled = true;
    answerInputEl.disabled = true;

    if (userAnswer === correctAnswer) {
        feedbackMsgEl.textContent = `Correct! The song is "${quizData[currentQuestionIndex].song}".`;
        feedbackMsgEl.style.color = "green";
        score++;
    } else {
        feedbackMsgEl.textContent = `Oops! The correct word was "${correctAnswer}" (Song: ${quizData[currentQuestionIndex].song}).`;
        feedbackMsgEl.style.color = "red";
    }

    nextBtn.classList.remove('hidden');
}

// Next Question
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
}

// Show Final Score
function showFinalScore() {
    quizContainer.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
    finalScoreEl.textContent = `You scored ${score} out of ${quizData.length}!`;
}

// Restart Quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    loadQuestion();
}

// Event Listeners
submitBtn.addEventListener('click', checkAnswer);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Allow pressing "Enter" to submit
answerInputEl.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !submitBtn.disabled) {
        checkAnswer();
    }
});

// Load the first question on startup
loadQuestion();