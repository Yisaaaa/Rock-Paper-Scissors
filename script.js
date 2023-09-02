const startBtnEL = document.querySelector(".btn--start");
const startPageEL = document.querySelector(".start-page");
const mainEL = document.querySelector(".main");

const clickSound = new Audio();
clickSound.src = "audio/click.mp3";

const damageSound = new Audio();
damageSound.src = "audio/damage-sound.mp3";

startBtnEL.addEventListener("click", function () {
    clickSound.play();
    // Sets a timeout for 1 sec
    setTimeout(() => {
        // Hide the start page
        hide(startPageEL);

        // Show the main page
        show(mainEL);

        // Initialize the game
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

// Hides the given element
function hide(element) {
    element.style.opacity = "0";
    element.style.pointerEvents = "none";
    element.style.visibility = "hidden";
}

// Show the given element
function show(element) {
    element.style.opacity = "1";
    element.style.pointerEvents = "auto";
    element.style.visibility = "visible";
}

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
            document.querySelector(".you-score").textContent = this.hScore;
        } else if (result === "lose") {
            this.cScore++;
            document.querySelector(".computer-score").textContent = this.cScore;
        }
    }

    // Plays a round of a game
    playRound(player, computer) {
        if (player === computer) {
            return "tie";
        } else if (this.#defeatsWhat[player] === computer) {
            this.dealDamage(document.querySelector(".computer-img"));
            return "win";
        } else {
            this.dealDamage(document.querySelector(".human-img"));
            return "lose";
        }
    }

    dealDamage(player) {
        player.classList.add("shake");
        damageSound.play();
        // console.log(player);
        document
            .querySelector(`.${player.classList[1]} .layer`)
            .classList.add("damaged-img");

        player.addEventListener("animationend", (e) => {
            console.log(e);
            document
                .querySelector(`.${player.classList[1]} .layer`)
                .classList.remove("damaged-img");
            player.classList.remove("shake");
        });
    }

    // Determine who won the game
    whoWon() {
        if (this.hScore === 5) {
            return "human";
        } else {
            return "computer";
        }
    }

    // Declares the winner
    declareWinner() {
        const weaponsEL = document.querySelector(".weapons");
        const winnerStatement = document.querySelector(".choose");

        hide(weaponsEL);

        winnerStatement.style.transform = "translateY(-22rem)";
        winnerStatement.style.fontSize = "4.8rem";
        if (this.whoWon() === "human") {
            winnerStatement.textContent = "Congratulations, human.";
        } else {
            winnerStatement.textContent = "You failed humanity.";
        }
    }

    updateResultStatement(human, computer, roundResult) {
        const resultEl = document.querySelector(".result");

        if (roundResult === "win") {
            resultEl.textContent = `Computer picked ${computer}. You ${roundResult}! ${human} beats ${computer}`;
        } else if (roundResult === "lose") {
            resultEl.textContent = `Computer picked ${computer}. You ${roundResult}! ${computer} beats ${human}`;
        } else {
            // It's a tie
            resultEl.textContent = `Computer picked ${computer}. It's a tie.`;
        }
    }

    start() {
        const weapons = document.querySelectorAll(".weapon");

        // Loops through all weapon buttons
        weapons.forEach((weapon) => {
            // Add an eventListener to every button
            weapon.addEventListener("click", () => {
                clickSound.play();

                const human = weapon.value;
                const computer =
                    this.#WEAPONS[this.getRandomInt(0, this.#WEAPONS.length)];

                let roundResult = this.playRound(human, computer);
                this.updateScore(roundResult);
                this.updateResultStatement(human, computer, roundResult);

                if (this.isThereAWinner()) {
                    this.declareWinner();
                }
            });
        });
    }
}
