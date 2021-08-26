const game = () => {
  var pScore = 0;
  var cScore = 0;

  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");


    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  };
  
  const playMatch = () => {
    options = document.querySelectorAll(".options button");
    playButton = document.querySelector(".restart");

    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");
    const winner = document.querySelector(".winner");
    const computerOptions = ["rock", "paper", "scissors"];

    hands.forEach(hand => {
      hand.addEventListener("animationend", function() {
        this.style.animation = "";
      });
    });
  
    options.forEach(option => {
      option.addEventListener("click", function() {
        //Computer Choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];
        
        if (winner.classList.contains("neon")) {
        winner.classList.remove("neon");
        }
        winner.textContent= `You chose ${this.textContent}...`;

        setTimeout(() => {
          compareHands(this.textContent, computerChoice);
          playerHand.src = `./assets/${this.textContent}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;
        }, 2000);

        playerHand.style.animation = "shakePlayer 2s ease-in-out";
        computerHand.style.animation = "shakeComputer 2s ease-in-out";

        // closed hands before each match
        playerHand.src = `./assets/rock.png`;
        computerHand.src = `./assets/rock.png`;
      });
    });
  };

  const compareHands = (playerChoice, computerChoice) => {

    const winner = document.querySelector(".winner");

    //Check for a tie
    if (playerChoice === computerChoice) {
      winner.textContent = `It is a tie!` ;
      return;
    }

    //Check for Rock
    if (playerChoice === "rock") {
      if (computerChoice === "scissors") {
        pScore++;
        winner.textContent = `Rock beats scissors!`;
      } else {
        cScore++;
        winner.textContent = `Paper covers rock!`;
      }
    }
    
    // Check for Paper
    if (playerChoice === "paper") {
      if (computerChoice === "scissors") {
        cScore++;
        winner.textContent = `Paper loses to scissors!`;
      } else {
        pScore++;
        winner.textContent = `Paper covers rock!`;
      }
    }

    //Check for Scissors
    if (playerChoice === "scissors") {
      if (computerChoice === "rock") {
        cScore++;
        winner.textContent = `Scissors loses to rock!`;
      } else {
        pScore++;
        winner.textContent = `Scissors beats paper!`;
      }
    }

    const updateScore = () => {
      const playerScore = document.querySelector(".player-score p");
      const computerScore = document.querySelector(".computer-score p");
      playerScore.textContent = pScore;
      computerScore.textContent = cScore;
    };

    const checkScore = () => {
      setTimeout(() => {
        if (pScore === 3) {
          winner.classList.add("neon");
          winner.textContent = ` You won! Play again ?`;
          pScore = cScore = 0;
          updateScore();
        }
        if (cScore === 3) {
          winner.classList.add("neon");
          winner.textContent = ` You lost... Play again ?`;
          pScore = cScore = 0;
          updateScore();
        }
      }, 1500);
    };

    updateScore();
    checkScore();
  };

  startGame();
  playMatch();
};

game();
