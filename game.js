'use strict';

game(5);

function game(numRounds){
    let playerScore = 0;
    let computerScore = 0;
    for(let i = 0; i < numRounds; i++){
        let roundResult;
        let computerSelection = computerPlay();
        let playerSelection = prompt("What do you want to play (rock, paper or scissor)?")
        if(playerSelection){
            
            roundResult = playRound(playerSelection, computerSelection);
            switch(roundResult){
                case 0:
                    console.log("It's a tie!");
                    break;
                case 1:
                    console.log("You win! " + playerSelection + " beats " + computerSelection + ".");
                    playerScore++;
                    break;
                case 2:
                    console.log("You loose! " + computerSelection + " beats " + playerSelection + ".");
                    computerScore++;
                case 3:
                    console.log("Unknown input - round skipped!");
                    break;

            }
        }else{
            console.log("Game Ended Prematurely!")
            break;
        }
    }

    if(playerScore > computerScore){
        console.log("Game over. You win! " + playerScore + " to " + computerScore);
    }else if(playerScore < computerScore){
        console.log("Game over. You lose! " + playerScore + " to " + computerScore);
    } else {
        console.log("Game over. Tie! " + playerScore + " to " + computerScore);
    }
}
function computerPlay(){
    let rand = getRndInteger(0,2);
    switch (rand){
        case 0:
            return "Rock";
        case 1:
            return "Scissor";
        case 2:
            return "Paper";
    }

}

//function returns 0 for tie, 1 for player win, 2 for computer win or 3 for invalid player input
function playRound(playerSelection, computerSelection){
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    switch(playerSelection){
        case "rock":
            if(computerSelection === "paper"){
                return 2
            }else if(computerSelection === "rock"){
                return 0;
            }else{
                return 1;
            }
        case "paper":
                if(computerSelection === "paper"){
                    return 0;
                }else if(computerSelection === "rock"){
                    return 1;
                }else{
                    return 2;
                }
        case "scissor":
                if(computerSelection === "paper"){
                    return 1;
                }else if(computerSelection === "rock"){
                    return 2;
                }else{
                    return 0;
                }
        default:
            return 3;
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }