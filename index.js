
let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;
let selectedOptionIndex = null;

const questionEl = document.getElementById("question");
const options = document.querySelectorAll(".option");
const nextBtn = document.getElementById("nextBtn");
const progressEl = document.getElementById("progress");
const timerEl = document.getElementById("timer");

// Shuffle questions
quizData.sort(() => Math.random() - 0.5);

loadQuestion();

function loadQuestion() {
    resetState();
    startTimer();

    const currentQuiz = quizData[currentQuestion];
    questionEl.innerText = currentQuiz.question;

    progressEl.innerText = `Question ${currentQuestion + 1} / ${quizData.length}`;

    options.forEach((option, index) => {
        option.innerText = currentQuiz.options[index];
        option.disabled = false;
        option.classList.remove("selected");
        option.onclick = () => selectAnswer(index);
    });
}

function resetState() {
    clearInterval(timerInterval);
    timeLeft = 15;
    selectedOptionIndex = null;

    timerEl.innerText = `⏱️ ${timeLeft}s`;
    nextBtn.style.display = "block";
    nextBtn.disabled = true;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.innerText = `⏱️ ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timerInterval);

            // Auto-submit answer if selected
            if (selectedOptionIndex !== null) {
                if (selectedOptionIndex === quizData[currentQuestion].answer) {
                    score++;
                }
            }

            // Move to next question automatically
            currentQuestion++;

            if (currentQuestion < quizData.length) {
                loadQuestion();
            } else {
                showResult();
            }
        }
    }, 1000);
}


function selectAnswer(index) {
    selectedOptionIndex = index;

    // Remove highlight from all options
    options.forEach(option => option.classList.remove("selected"));

    // Highlight selected option
    options[index].classList.add("selected");

    // Enable Next
    nextBtn.disabled = false;
}

function lockOptions() {
    options.forEach(option => option.disabled = true);
}

nextBtn.addEventListener("click", () => {
    clearInterval(timerInterval);

    if (selectedOptionIndex !== null) {
        if (selectedOptionIndex === quizData[currentQuestion].answer) {
            score++;
        }
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    const total = quizData.length;
    const wrong = total - score;
    const percentage = ((score / total) * 100).toFixed(2);

    let bestScore = localStorage.getItem("bestScore");
    if (!bestScore || score > bestScore) {
        localStorage.setItem("bestScore", score);
        bestScore = score;
    }

    let message = "";
    if (percentage >= 80) message = "Excellent Performance 🎉";
    else if (percentage >= 50) message = "Good Job 👍";
    else message = "Needs Improvement 💡";

    document.querySelector(".quiz-container").innerHTML = `
        <h2>Quiz Completed</h2>
        <p><strong>Total Questions:</strong> ${total}</p>
        <p><strong>Correct Answers:</strong> ${score}</p>
        <p><strong>Wrong Answers:</strong> ${wrong}</p>
        <p><strong>Percentage:</strong> ${percentage}%</p>
        <p><strong>Best Score:</strong> ${bestScore}</p>
        <h3>${message}</h3>
        <button onclick="location.reload()">Restart Quiz</button>
    `;
}
function lockOptions() {
    options.forEach(option => option.disabled = true);
}

