'use strict';


let playerScore = 0;
let computerScore = 0;

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', game)
});

const hands = document.querySelectorAll('.hands');
hands.forEach(hand => {
    hand.addEventListener('transitionend', transition)
});


function game(e) {
    this.firstElementChild.classList.add('playing');
    const playerSelection = this.id;
    const computerSelection = computerPlay();
    const roundResult = playRound(playerSelection, computerSelection);
    let roundResultText;
    switch (roundResult) {
        case 0:
            roundResultText = "It's a tie!";
            break;
        case 1:
            roundResultText = "You Win!";
            playerScore++;
            break;
        case 2:
            roundResultText = "Computer Wins!";
            computerScore++;
            break;
        case 3:
            roundResultText = "unknown inputs";
            break;
    }

    showHands(playerSelection, computerSelection);
    updateResult(roundResultText);
    updateScore(playerScore, computerScore);

    if (playerScore > 4 || computerScore > 4) {
        document.getElementById("Rock").disabled = true;
        document.getElementById("Paper").disabled = true;
        document.getElementById("Scissor").disabled = true;
        setTimeout(() => {
            let handsBox = document.querySelector(".hands-box");
            handsBox.textContent = '';

            if (playerScore > 4) {
                document.querySelector(".results").innerHTML = "Game Over - You Win!<br /> Refresh to Playing Again.";
            } else {
                document.querySelector(".results").innerHTML = "Game Over - You Lose!<br /> Refresh to Playing Again.";
            }
        }, 1500);

    }

}

function computerPlay() {
    let rand = getRndInteger(0, 2);
    switch (rand) {
        case 0:
            return "Rock";
        case 1:
            return "Scissor";
        case 2:
            return "Paper";
    }

}

//function returns 0 for tie, 1 for player1 win, 2 for player2 win or 3 for invalid player(s) input
function playRound(player1, player2) {
    player1 = player1.toLowerCase();
    player2 = player2.toLowerCase();

    switch (player1) {
        case "rock":
            if (player2 === "paper") {
                return 2;
            } else if (player2 === "rock") {
                return 0;
            } else if (player2 === "scissor") {
                return 1;
            }
        case "paper":
            if (player2 === "paper") {
                return 0;
            } else if (player2 === "rock") {
                return 1;
            } else if (player2 === "scissor") {
                return 2;
            }
        case "scissor":
            if (player2 === "paper") {
                return 1;
            } else if (player2 === "rock") {
                return 2;
            } else if (player2 === "scissor") {
                return 0;
            }
        default:
            return 3;
    }
}

function transition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}

function updateScore(playerScore, computerScore) {
    (document.querySelector('#playerScore')).textContent = playerScore;
    (document.querySelector('#computerScore')).textContent = computerScore;

}

function showHands(player1, player2) {
    let handsBox = document.querySelector(".hands-box");
    handsBox.innerHTML = "";
    let leftHand = document.createElement('img');
    let rightHand = document.createElement('img');
    leftHand.classList.add("hands-playing");
    rightHand.classList.add("hands-playing");
    leftHand.setAttribute("src", `style/${player1.toLowerCase()}.png`);
    if (player1.toLowerCase() === "rock") {
        leftHand.setAttribute("id", "flip");
    }
    if (player2.toLowerCase() === "paper" || player2.toLowerCase() === "scissor") {
        rightHand.setAttribute("id", "flip");
    }
    rightHand.setAttribute("src", `style/${player2.toLowerCase()}.png`);

    handsBox.appendChild(leftHand);
    handsBox.appendChild(rightHand);

}

function updateResult(resultText) {
    document.querySelector(".results").textContent = resultText;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

