const startBtnEL = document.querySelector(".btn--start");
const startPageEL = document.querySelector(".start-page");
const clickSound = new Audio();
clickSound.src = "audio/click.mp3";

startBtnEL.addEventListener("click", function () {
  clickSound.play();
  setTimeout(() => {
    startPageEL.style.opacity = "0";
    startPageEL.style.pointerEvents = "none";
    startPageEL.style.visibility = "hidden";
    const mainEL = document.querySelector(".main");
    mainEL.style.opacity = "1";
    mainEL.style.pointerEvents = "auto";
    mainEL.style.visibility = "visible";

    const game = new Game();
    game.start();
  }, 1000);
});

// Create a function that plays a round of the game
// This function takes two arguments--player's choice and computer's choice

// const defeatsWhat = { rock: "scissors", paper: "rock", scissors: "paper" };
// const CHOICES = ["rock", "paper", "scissors"];

// }

// function startGame() {
//   // Initial scores h = human and c = computer
//   let hScore = 0;
//   let cScore = 0;

//   const weapons = document.querySelectorAll(".weapon");
//   weapons.forEach((weapon) => {
//     weapon.addEventListener("click", () => {
//       let hWeapon = weapon.value;
//       let cWeapon = CHOICES[getRandomInt(0, 3)];
//       // console.log(cWeapon);
//       // console.log(playRound(hWeapon, cWeapon));
//       let result = playRound(hWeapon, cWeapon);
//     });
//   });
// }

class Game {
  #defeatsWhat = { rock: "scissors", paper: "rock", scissors: "paper" };
  #WEAPONS = ["rock", "paper", "scissors"];
  constructor() {
    this.hScore = 0;
    this.cScore = 0;
  }

  // Returns a boolean if there is a winner already
  isThereAWinner() {
    return this.hScore === 5 || this.cScore === 5;
  }

  // Returns a number between min and max. Min is inclusive.
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  // Updates the score depending on the result of the round.
  updateScore(result) {
    if (result === "win") {
      this.hScore++;
    } else if (result === "lose") {
      this.cScore++;
    }
  }

  // Plays a round of a game
  playRound(player, computer) {
    if (player === computer) {
      return "tie";
    } else if (this.#defeatsWhat[player] === computer) {
      return "win";
    } else {
      return "lose";
    }
  }

  whoWon() {
    if (this.hScore === 5) {
      return "human";
    } else {
      return "computer";
    }
  }

  start() {
    let result;
    const weapons = document.querySelectorAll(".weapon");
    weapons.forEach((weapon) => {
      weapon.addEventListener("click", () => {
        const human = weapon.value;
        const computer =
          this.#WEAPONS[this.getRandomInt(0, this.#WEAPONS.length)];

        console.log(`human: ${human}`);
        console.log(`computer: ${computer}`);
        result = this.playRound(human, computer);
        this.updateScore(result);
        console.log(
          `human score: ${this.hScore}. computer score ${this.cScore}`
        );

        if (this.isThereAWinner()) {
          console.log(this.whoWon());
          document.querySelector(".main");
        }
      });
    });
  }
}
