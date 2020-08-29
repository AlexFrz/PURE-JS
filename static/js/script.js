// Challenge 1: Your Age in Days

function ageInDays() {
  var birthYear = prompt("When were you born?");

  var ageInDayss = (2020 - birthYear) * 365;

  var h1 = document.createElement("h1");
  var textAnswer = document.createTextNode(
    "You are " + ageInDayss + " days old."
  );

  h1.setAttribute("id", "ageInDays");
  h1.appendChild(textAnswer);
  document.getElementById("flex-box-result").appendChild(h1);
}

function reset() {
  document.getElementById("ageInDays").remove();
}

// Challenge 2: Generate Cat

function generateCat() {
  var image = document.createElement("img");
  var div = document.getElementById("flex-cat-gen");
  image.src =
    "https://image.shutterstock.com/image-photo/portrait-surprised-cat-scottish-straight-260nw-499196506.jpg";
  div.appendChild(image);
}

// Challenge 3: Rock, Paper, Scissors

function rpsGame(yourChoice) {
  console.log(yourChoice);
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;

  botChoice = numberToChoice(randToRpsInt());
  console.log(botChoice);

  results = decideWinner(humanChoice, botChoice);
  console.log(results); // [0, 1] human lost | bot won

  message = finalMessage(results); // {'message': 'You won!', 'color': 'green'}
  console.log(message);
  rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
  return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
  return ["rock", "paper", "scissors"][number];
}

function decideWinner(yourChoice, botChoice) {
  var rpsDatabase = {
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { paper: 1, scissors: 0.5, rock: 0 },
  };

  var yourScore = rpsDatabase[yourChoice][botChoice];
  var botScore = rpsDatabase[botChoice][yourChoice];

  return [yourScore, botScore];
}

function finalMessage([yourScore, botScore]) {
  if (yourScore == 0) {
    return { message: "You lost!", color: "red" };
  } else if (yourScore === 0.5) {
    return { message: "Same same", color: "yellow" };
  } else {
    return { message: "You won!", color: "green" };
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  var imagesDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };

  // remove all images
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();

  var humanDiv = document.createElement("div");
  var botDiv = document.createElement("div");
  var messageDiv = document.createElement("div");

  humanDiv.innerHTML =
    "<img src='" +
    imagesDatabase[humanImageChoice] +
    "' height='150px' width='150px' style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);' />";

  botDiv.innerHTML =
    "<img src='" +
    imagesDatabase[botImageChoice] +
    "' height='150px' width='150px' style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);' />";

  messageDiv.innerHTML =
    "<h1 style='color: " +
    finalMessage["color"] +
    "; font-size: 60px; padding: 30px; '>" +
    finalMessage["message"] +
    "</h1>";

  document.getElementById("flex-box-rps-div").appendChild(humanDiv);
  document.getElementById("flex-box-rps-div").appendChild(messageDiv);
  document.getElementById("flex-box-rps-div").appendChild(botDiv);
}

// Challenge 4: Change th Color of all Buttons
var all_buttons = document.getElementsByTagName("button");

var copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy) {
  if (buttonThingy.value === "red") {
    buttonsRed();
  } else if (buttonThingy.value === "green") {
    buttonsGreen();
  } else if (buttonThingy.value === "reset") {
    buttonColorReset();
  } else if (buttonThingy.value === "random") {
    randomColors();
  }
}

function buttonsRed() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-danger");
  }
}

function buttonsGreen() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-success");
  }
}

function buttonColorReset() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}

function randomColors() {
  let choices = ["btn-primary", "btn-danger", "btn-success", "btn-warning"];

  for (let i = 0; i < all_buttons.length; i++) {
    let randomNumber = Math.floor(Math.random() * 4);

    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randomNumber]);
  }
}

// Challenge 5: Blackjack
let blackjackGame = {
  you: { scoreSpan: "#your-blackjack-result", div: "#your-box", score: 0 },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },
  cards: [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "K",
    "J",
    "Q",
    "K",
    "A",
  ],
  cardsMap: {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    K: 10,
    J: 10,
    Q: 10,
    K: 10,
    A: [1, 11],
  },
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

const hitSound = new Audio("static/sounds/swish.m4a");
const winSound = new Audio("static/sounds/cash.mp3");
const lossSound = new Audio("static/sounds/aww.mp3");

document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackHit);

document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", dealerLogic);

document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackJackDeal);

function blackjackHit() {
  let card = randomCard();
  console.log(card);
  showCard(card, YOU);
  updateScore(card, YOU);
  showScore(YOU);
  console.log(YOU["score"]);
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][randomIndex];
}

function showCard(card, activePlayer) {
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
}

function blackJackDeal() {
  let winner = computeWinner();
  showResult(winner);

  // showResult(computeWinner());
  let yourImages = document.querySelector("#your-box").querySelectorAll("img");
  let dealerImages = document
    .querySelector("#dealer-box")
    .querySelectorAll("img");

  for (i = 0; i < yourImages.length; i++) {
    yourImages[i].remove();
  }

  for (i = 0; i < dealerImages.length; i++) {
    dealerImages[i].remove();
  }

  YOU["score"] = 0;
  DEALER["score"] = 0;

  document.querySelector("#your-blackjack-result").textContent = 0;
  document.querySelector("#your-blackjack-result").style.color = "white";
  document.querySelector("#dealer-blackjack-result").textContent = 0;
  document.querySelector("#dealer-blackjack-result").style.color = "white";
}

function updateScore(card, activePlayer) {
  if (card === "A") {
    if (activePlayer["score"] + blackjackGame["cardsMap"][card] <= 21) {
      activePlayer["score"] + blackjackGame["cardsMap"][card][1];
    } else {
      activePlayer["score"] += blackjackGame["cardsMap"][card][0];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardsMap"][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      "Bust, little bitch!";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}

function dealerLogic() {
  let card = randomCard();
  showCard(card, DEALER);
  updateScore(card, DEALER);
  showScore(DEALER);
}

// compute winner and return who just won

function computeWinner() {
  let winner;

  if (YOU["score"] <= 21) {
    // condition: higher score than dealer or when dealer busts but you're under 21
    if (YOU["score"] > DEALER["SCORE"] || DEALER["SCORE"] > 21) {
      winner = YOU;
      console.log("You won!");
    } else if (YOU["score"] < DEALER["score"]) {
      console.log("You lost!");
      winner = DEALER;
    } else if (YOU["score"] === DEALER["score"]) {
      console.log("Same same motherfuckers.");

      // condition: when user busts but dealer doesn't
    } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
      console.log("You lost!");
      winner = DEALER;
    } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
      console.log("Same same motherfuckers");
    }
    console.log("Winner is", winner);
    return winner;
  }
}

function showResult(winner) {
  if (winner === YOU) {
    message = "You won!";
    messageColor = "green";
    winSound.play();
  } else if (winner === DEALER) {
    message = "You lost!";
    messageColor = "red";
    lossSound.play();
  } else {
    message = "Same same motherfuckers...";
    messageColor = "black";
  }

  document.querySelector("#blackjack-result").textContent = message;
  document.querySelector("#blackjack-result").style.color = messageColor;
}
