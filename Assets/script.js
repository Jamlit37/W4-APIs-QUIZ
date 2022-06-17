  var begin = document.querySelector("#begin");
  var leader = document.querySelector("#leader");
  var card = document.querySelector("#multiChoice");
  var question = document.querySelector("#question");
  var multiA = document.querySelector("#multiA");
  var multiB = document.querySelector("#multiB");
  var multiC = document.querySelector("#multiC");
  var multiD = document.querySelector("#multiD");
  var answer = document.querySelector("#answer");
  var timerDisplay = document.querySelector(".timer");
  var gameCard = document.querySelector("#gameCard");
  var feedback = document.querySelector("#feedback1");
  var start = document.querySelector(".start");
  var inputForm = document.querySelector("#inputForm");
  var scoreCard = document.querySelector("#scoreCard");
  var backButton = document.querySelector("#backButton");
  var clearButton = document.querySelector("#clearButton");
  var scoreButton = document.querySelector("#scoreButton");
  var initialsBox = document.querySelector("#initialsBox");
  var submitButton = document.querySelector("#submitButton");
  var questionBank = [
  {   
      question: "Which mammal is known to have the most powerful bite in the world?",
      selection: ["Lion", "Horse", "Hippopotamus", "Elephant"],
      answer: "Hippopotamus"
  },
  {   
      question: "Which animal is known to spend 90% of its day, sleeping?",
      selection: ["Sloth", "Butterfly", "Lion", "Koala"],
      answer: "Koala"
  },
  {   
      question: "What color is the tongue of a giraffe?", 
      selection: ["Blue", "Purple", "Pink", "Yellow"],
      answer: "Purple"
  },
  {
      question: "Which animal's stripes are on their skin as well as their fur?",
      selection: ["Tiger", "Zebra", "Skunk", "Lemur"],
      answer: "Tiger"
  },
  {
      question: "How many compartments are in a cow's stomach?",
      selection: ["One", "Two", "Three", "Four"],
      answer: "Four"
  },
  {
      question: " What animal breathes out of its butt?",
      selection: ["Snake", "Turtle", "Lizard", "Crocodile"],
      answer: "Turtle"
  },
  {
      question: "What's a group of frogs called?",
      selection: ["Infantry", "Gang", "Squad", "Army"],
      answer: "Army"
  },
  {
      question: "Which of these animals is NOT venomous?",
      selection: ["Death Stalker Scorpion", "Box Jellyfish", "Golden Dart Frog", "Blue-Ringed Octopus"],
      answer: "Golden Dart Frog"
  },
  {
      question: "How many eyes do caterpillars have?",
      selection: ["Two", "Six", "Twelve", "Twenty-Four"],
      answer: "Twelve"
  },
  {
      question: "What is the loudest insect in the world?",
      selection: ["Cicada", "Cricket", "Locust", "Katydids"],
      answer: "Cicada"
  },
  {
      question: "Which insect has the most painful sting?",
      selection: ["Warrior wasp", "Tarantula hawk", "Bullet ant", "Red harvester ant"],
      answer: "Bullet ant"
  }

];

var timeRemain = questionBank.length * 10;
var score = 0;
var scoreList = [];
var timeInterval;
var q = 0;
var s = 0;

getScore();

function timer() {
  timeInterval = setInterval(function () {
    timeRemain--;
    timerDisplay.textContent = "TIMER: " + timeRemain;

    if (timeRemain === 0 || q >= questionBank.length) {
      clearInterval(timeInterval);
      gameOver();
    }
  }, 1000);
};

function displayQA() {
  if (q < questionBank.length) {
    question.textContent = questionBank[q].question;
    multiA.textContent = questionBank[q].selection[0];
    multiB.textContent = questionBank[q].selection[1];
    multiC.textContent = questionBank[q].selection[2];
    multiD.textContent = questionBank[q].selection[3];
  } else {
    gameOver();
  }
};

function compareAnswer(event) {
  if (q >= questionBank.length) {
    gameOver();
    clearInterval(timeInterval);
  } else {
    if (event === questionBank[q].answer) {
      feedback1.textContent = "You got it right :)";
      feedback1.style.color = "green";
    } else {
      timeRemain -= 10;
      feedback1.textContent = "You got it wrong :(";
      feedback1.style.color = "red";
    }
    score = timeRemain;
    q++;
    displayQA();
  }
};

function getScore() {
  var storedScore = JSON.parse(localStorage.getItem("highScore"));
  if (storedScore !== null) {
    scoreList = storedScore;
  }
};

function saveScore() {
  localStorage.setItem("highScore", JSON.stringify(scoreList));
};

function gameOver() {
  scoreButton.innerHTML = score;
  scoreButton.style.display = "inline-block";
  gameCard.classList.add("hide");
  inputForm.classList.remove("hide");
  timerDisplay.classList.add("hide");
  leader.classList.add("hide");
  leaderBoard();
};

function leaderBoard() {
  removeFromLeaderBoard();
  addToLeaderBoard();
  scoreList.sort((a, b) => {
    return b.score - a.score;
  });

  topTen = scoreList.slice(0, 10);

  for (var i = 0; i < topTen.length; i++) {
    var player = topTen[i].player;
    var score = topTen[i].score;

    var newDiv = document.createElement("div");
    leaderBoardDiv.appendChild(newDiv);

    var newLabel = document.createElement("label");
    newLabel.textContent = player + " - " + score;
    newDiv.appendChild(newLabel);
  }
};

function addToLeaderBoard() {
  leaderBoardDiv = document.createElement("div");
  leaderBoardDiv.setAttribute("id", "playerInitials");
  document.getElementById("leaderBoard").appendChild(leaderBoardDiv);
};

function removeFromLeaderBoard() {
  var removeScores = document.getElementById("playerInitials");
  if (removeScores !== null) {
    removeScores.remove();
  } else {
  }
};

begin.addEventListener("click", function (event) {
  timer();
  displayQA();
  start.classList.add("hide");
  gameCard.classList.remove("hide");
  leader.style.display = "none";
  scoreCard.classList.add("hide");
});

card.addEventListener("click", function (event) {
  var event = event.target;
  compareAnswer(event.textContent.trim());
});

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var playerInitials = initialsBox.value.trim();
  var newScore = {
    player: playerInitials,
    score: score,
  };
  
  scoreList.push(newScore);
  saveScore();
  leaderBoard();
  inputForm.classList.add("hide");
  scoreCard.classList.remove("hide");
});

leader.addEventListener("click", function (event) {
  scoreCard.classList.remove("hide");
  leader.classList.add("hide");
  start.classList.add("hide");
  leaderBoard();
});

backButton.addEventListener("click", function (event) {
  location.reload();
});

clearButton.addEventListener("click", function (event) {
  scoreList = [];
  start.classList.add("hide");
  localStorage.setItem("highScore", JSON.stringify(scoreList));
  leaderBoard();
  saveScore();
});

