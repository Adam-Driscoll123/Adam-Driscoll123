
let score = JSON.parse(localStorage.getItem('score')) ||{

    Wins: 0,
    Losses: 0,
    Ties: 0
}
updateScoreElement();

let computerMove = '';
let result = '';

console.log(localStorage.getItem('score'));

function computerGuess(){
let randomNumber = Math.random();

if (randomNumber<=1/3){
    computerMove ='rock';
}
else if (randomNumber>2/3){
    computerMove = 'scissors';
}
else{
    computerMove = 'paper';
}
return computerMove;
}

function checkWinner(playerGuess, computerMove){
console.log(`Player chose ${playerGuess} and computer chose ${computerMove}`);
if (playerGuess === computerMove){
    result = 'Tie.';
}
else if (playerGuess === 'rock'){
    result = (computerMove==='scissors') ? 'You win!' : 'You lose.';
}
else if (playerGuess === 'paper'){
    result = (computerMove==='rock') ? 'You win!' : 'You lose.';
}
else if (playerGuess === 'scissors'){
    result = (computerMove==='paper') ? 'You win!' : 'You lose.';
}
if (result==='You win!'){
    score.Wins++;
}
else if (result==='You lose.'){
    score.Losses++;
}
else{
    score.Ties++;
}

document.querySelector('.js-result').innerHTML = result;
document.querySelector('.js-moves').innerHTML =`You 
    <img class="move-image" src="media/${playerGuess}.png">
    <img class="move-image" src="media/${computerMove}.png"> Computer`
localStorage.setItem('score', JSON.stringify(score));

updateScoreElement();

}

function updateScoreElement(){
document.querySelector('.js-score')
    .innerHTML = 
    `Score: Wins: ${score.Wins}, 
    Losses: ${score.Losses}, 
    Ties: ${score.Ties}`;
}

      
