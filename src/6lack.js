function showSongs() {
  let moodSelect = document.getElementById("mood");
  let selectedMood = moodSelect.value;
  let songsContainer = document.getElementById("songs-container");
  let loader = document.querySelector(".loader");

  loader.style.display = "block";

  let moodSongs = {
    happy: ["Switch", "Outside", "Wunna dem ft Quin", "Fav ft Quin", "Float"],
    Love: [
      "Outside",
      "Seasons ft Khalid",
      "Pretty Little Fears ",
      "Learn Ya",
      "Long Night",
      "Stan",
    ],
    heartBreak: [
      "Prblm",
      "Imported",
      "Cutting Ties",
      "Disconnect",
      "Been A while",
      "Nonchalant",
    ],
    reflective: [
      "free",
      "Luving u",
      "Thuggers Interlude",
      "In-between",
      "Unfair",
      "Sorry",
    ],
    calm: [
      "Waves",
      "Muschroom Chocolate",
      "Touch and Go",
      "Calling my Phone",
      "Sere(remix)",
    ],
  };

  let songs = moodSongs[selectedMood] || [];
  setTimeout(() => {
    try {
      let songsList = songs.map((song) => `<li>${song}</li>`).join("");

      songsContainer.innerHTML = "";
      let title = document.createElement("h3");

      title.textContent = `Songs for ${selectedMood} Mood`;
      title.classList.add("songs-title");
      songsContainer.appendChild(title);

      songsContainer.innerHTML += `<ul>${songsList}</ul>`;
    } catch (error) {
      console.error("Error loading songs:", error);
    } finally {
      loader.style.display = "none";
    }
  }, 1000);

  return false;
}

/* knowmeter*/
const questions = [
  {
    question: "What is 6LACK's real name?",
    answers: [
      { text: "Ricardo Valentine", correct: true },
      { text: "Lukas Graham", correct: false },
      { text: " Malcolm James McCormick", correct: false },
      { text: "Abel Makkonen Tesfaye", correct: false },
    ],
  },

  {
    question:
      "In which year did 6LACK release his debut studio album _FREE 6LACK_?",
    answers: [
      { text: "2014", correct: false },
      { text: "2016", correct: true },
      { text: "2018", correct: false },
      { text: "2023", correct: false },
    ],
  },
  {
    question: " 6LACK is associated with which record label?",
    answers: [
      { text: "Roc Nation", correct: false },
      { text: "LVRN", correct: true },
      { text: "Top Dawg Entertainment", correct: false },
      { text: "OVO Sound", correct: false },
    ],
  },

  {
    question:
      "What is the title of 6LACK's second studio album, released in 2018?",
    answers: [
      { text: "FREE 6LACK", correct: false },
      { text: "Ex Calling", correct: false },
      { text: "Switch", correct: false },
      { text: "East Atlanta Love Letter", correct: true },
    ],
  },
  {
    question:
      "Guess the chorus --I don't wanna fight or be at war,With you, but you Gotta want the same things",
    answers: [
      { text: "FREE 6LACK", correct: false },
      { text: "Ex Calling", correct: false },
      { text: "Unfair", correct: true },
      { text: "Switch", correct: false },
    ],
  },

  {
    question: "Which track earned 6LACK his first Grammy nomination in 2019?",
    answers: [
      { text: "Pretty Little Fears", correct: true },
      { text: "PRBLMS", correct: false },
      { text: "Ex Calling", correct: false },
      { text: "Switch", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next Question";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  answerButton.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn1");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectedAnswer);
  });
}
function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectedAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  const scorePercentage = (score / questions.length) * 100;

  let message = "";
  if (scorePercentage < 50) {
    message = "I feel like you can try again and get a better score";
  } else if ((scorePercentage) => 70) {
    message = "You are definitely a fan.Welcome to the 6lackiverse!";
  } else {
    message = "You're doing Well!";
  }

  questionElement.innerHTML = `You Scored ${score} out of ${questions.length}! ${message}`;
  nextButton.innerHTML = "Try again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
