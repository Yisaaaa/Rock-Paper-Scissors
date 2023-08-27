const startBtnEL = document.querySelector(".btn--start");
const startPageEL = document.querySelector(".start-page");

startBtnEL.addEventListener("click", function () {
  startPageEL.style.opacity = "0";
});

// Create a function that plays a round of the game
// This function takes two arguments--player's choice and computer's choice

const defeatsWhat = { rock: "scissors", paper: "rock", scissors: "paper" };

function playRound(player, computer) {
  if (player === computer) {
    return "tie";
  } else if (defeatsWhat[player] === computer) {
    return "win";
  } else {
    return "lose";
  }
}
