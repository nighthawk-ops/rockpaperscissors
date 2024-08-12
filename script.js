const display = document.querySelector(".display");
let playerScoreCounter = 0;
let pcScoreCounter = 0;
let roundCounter = 0;
let round = document.createElement("h3");
let result = document.createElement("h4");
result.textContent = "Make your move!!";
result.style.color="#6B8E4E";
let playerScore = document.createElement("div");
let pcScore = document.createElement("div");
const buttons = document.querySelectorAll(".controls");
const retry = document.querySelector('#retry');
retry.style.display='none';

function checkWinner(player, computer){
    if(player === computer){
        return "tie";
    }
    else if((player === "rock" && computer === "scissors")||(player === "paper" && computer === "rock")||(player === "scissors" && computer === "paper")){
        return "win";     
    }
    else{
        return "lose";
    }
}


function getComputerChoice(){
    const choices = ["rock", "paper", "scissors"];
    compChoice = choices[Math.floor(Math.random()* choices.length)];
    return compChoice;
}


function playRound(e){
    let computer = getComputerChoice();
    let player = e.target.id;
    let matchWinner = checkWinner (player, computer);

    if (matchWinner === "tie"){
        result.textContent="It's a tie";
        roundCounter++;
    }else if(matchWinner === "win"){
        result.textContent="You won this round!!";
        roundCounter++;
        playerScoreCounter++;
        playerScore.textContent=`Player score:${playerScoreCounter}`;
    }else{
        result.textContent= "You lost this round :(";
        roundCounter++;
        pcScoreCounter++;
        pcScore.textContent=`PC score:${pcScoreCounter}`;
    }

    round.textContent = `Round ${roundCounter}`;

    if (playerScoreCounter === 5 || pcScoreCounter === 5){
        endGame();
    }
}



function endGame(){
    if (playerScoreCounter === 5 ){
        result.textContent="Player wins!!!!";
    }else{
        result.textContent="You lose :(";
    }

    buttons.forEach((button)=>{
        button.disabled=true;
    })
    display.appendChild(retry);
    retry.style.display='block';
}



function restartGame(){
    pcScoreCounter = 0;
    playerScoreCounter = 0;
    pcScore.textContent=`PC score: ${pcScoreCounter}`;
    playerScore.textContent=`Player score: ${playerScoreCounter}`;
    roundCounter = 0;
    round.textContent =`Round:${roundCounter}`;
    result.textContent="Choose your move";

    buttons.forEach((button)=>{
        button.disabled=false;
    });
    
    retry.style.display ='none';
}

retry.addEventListener("click", restartGame);

buttons.forEach((button) => {
    button.addEventListener("click", playRound);
});




display.appendChild(round);
display.appendChild(result);
display.appendChild(playerScore);
display.appendChild(pcScore);

