let pScore = 0;
let cScore = 0;

const game = () => {


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
    const options = document.querySelectorAll(".options button");
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
      const optionsDiv = document.querySelector(".options");

      if (pScore === 3) {
        winner.textContent += ` Player wins!`;
        const restartBtn = document.createElement('button');
        restartBtn.innerHTML = 'Play again!';
        optionsDiv.appendChild(restartBtn);
      }
      if (cScore === 3) {
        winner.textContent += ` Computer wins!`;
        const restartBtn = document.createElement('button');
        restartBtn.innerHTML = 'Play again!';
        optionsDiv.appendChild(restartBtn);
      }
    };

    checkScore();
    updateScore();
  };

  startGame();
  playMatch();
};

const restart = () => {
  const playButton = document.querySelector(".options .restart button");
  // console.log(document.querySelector(".options button"));
  if (pScore === 3 || cScore === 3) {
    playButton.addEventListener("click", () => {
      pScore = 0;
      cScore = 0;
      playerHand.src = `./assets/rock.png`;
      computerHand.src = `./assets/rock.png`;
      optionsDiv.innerHTML = `
        <button class="rock">rock<i class="fas fa-gem"></i></button>
        <button class="paper">paper<i class="fas fa-leaf"></i></button>
        <button class="scissors">scissors<i class="fas fa-cut"></i></button>
      `;
      winner.textContent = 'Choose an option.';
    });
  }
};

game();
restart();
