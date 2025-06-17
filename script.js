let answerSelected = false;
let currentQuestion = 0;
let score = 0;

const nextQuestionDiv = document.getElementById("next");
const feedbackDiv = document.getElementById("feedback");
const questionDiv = document.getElementById("question");
const answerButtons = document.getElementsByClassName("answer");
const questionArea = document.getElementById("question-area");

nextQuestionDiv.classList.add("hidden");

function shuffle(array) {
  const copy = array.slice();
  let result = [];
  while (copy.length > 0) {
    const randomIndex = Math.floor(Math.random() * copy.length)
    result.push(copy[randomIndex]);
    copy.splice(randomIndex, 1);
  }
  return result;
};

questions = shuffle(questions);
for (let question of questions) {
    question.answers = shuffle(question.answers);
}

for (let button of answerButtons) {
    button.addEventListener("click", function () {
        if (!answerSelected) {
            if (button.dataset.correct === "true") {
                feedbackDiv.innerText = "Correct!";
                score++;
            } else {
                feedbackDiv.innerText = "Wrong!";
            }
            answerSelected = true;
            nextQuestionDiv.classList.remove("hidden");
        }
    });
}

function showQuestion(questionIdx) {
    questionDiv.innerText = questions[questionIdx].text;

    try {
        if (questions[questionIdx].answers.length !== 4) {
            throw "invalid number of answers";
        }
        for (let i = 0; i < answerButtons.length; i++) {
            let answerToDisplay = questions[questionIdx].answers[i][0];
            answerButtons[i].innerText = answerToDisplay;
            answerButtons[i].dataset.correct = questions[questionIdx].answers[i][1];
        }
    }
    catch(err) {
        console.log(err);
    }
}

showQuestion(currentQuestion);

nextQuestionDiv.addEventListener("click", function () {
    if (currentQuestion === questions.length - 1) {
        endGame();
    }
    else {
        showNextQuestion();
    }
});

function showNextQuestion() {
    currentQuestion++;
    showQuestion(currentQuestion);
    answerSelected = false;
    nextQuestionDiv.classList.add("hidden");
    feedbackDiv.innerText = "";
}

function endGame() {
    questionArea.innerHTML = `
    <h2>Game over!</h2>
    <h3>Your score: ${score} / ${questions.length}</h3>
    `;
}