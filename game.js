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

    let resultDiv = document.querySelector('.results');
    resultDiv.textContent = "";
    resultDiv.insertAdjacentHTML('beforeend', '<p>and the winner is ...</p>');
    setTimeout(() => {
        switch (roundResult) {
            case 0:
                resultDiv.insertAdjacentHTML('beforeend', "<p>It's a tie!</p>");
                break;
            case 1:
                resultDiv.insertAdjacentHTML('beforeend', `<p>You win! ${playerSelection} beats ${computerSelection}.</p>`);
                playerScore++;
                (document.querySelector('.playerScore')).textContent = String(playerScore);
                break;
            case 2:
                resultDiv.insertAdjacentHTML('beforeend', `<p>You loose! ${computerSelection} beats ${playerSelection}.</p>`);
                computerScore++;
                (document.querySelector('.computerScore')).textContent = String(computerScore);
                break;
            case 3:
                resultDiv.insertAdjacentHTML('beforeend', "<p>Unknown input - round skipped!</p>");
                break;

        }
    }
        , 1000);

    if (computerScore > 4 || playerScore > 4) {
        let instructionsBox = document.querySelector('.instructions');
        instructionsBox.textContent = `Game Over!`


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

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

