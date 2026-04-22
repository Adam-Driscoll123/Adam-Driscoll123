let computerMove = '';
let result = '';
let autoPlayID;
let isAutoPlaying = false;
let autoPlayButton = document.querySelector(".js-auto-play-button");
let containerElement = document.querySelector('.js-message-container');
let score = JSON.parse(localStorage.getItem('score')) ||
{
	Wins: 0,
	Losses: 0,
	Ties: 0
}
updateScoreElement();

//Event Listeners
//document.querySelector('.js-rock-button').addEventListener('click', () =>{ playGame('rock'); });
//document.querySelector('.js-paper-button').addEventListener('click', () =>{ playGame('paper'); });
//document.querySelector('.js-scissors-button').addEventListener('click', () =>{ playGame('scissors'); });
document.querySelectorAll('.js-move-button').forEach(button => {
	button.addEventListener('click', () => {
		containerElement.classList
		playGame(button.dataset.move);
	});
});
document.addEventListener('click', (event) => {
	if (!event.target.closest('.js-reset-button')){
		containerElement.classList.remove('message-container--active');
	}
	else{
		containerElement.classList.add('message-container--active');
	}
	
})

document.querySelector('.js-auto-play-button').addEventListener('click', toggleAutoPlay);
document.querySelector('.js-yes-button').addEventListener('click', resetScore);
document.body.addEventListener('keydown', (event) => {

	if (event.key==='r'){ playGame('rock'); }
	else if (event.key==='p'){ playGame('paper'); }
	else if (event.key==='s'){ playGame('scissors'); }
	else if (event.key==='a'){ toggleAutoPlay(); } 
	else if (event.key==='a'){ toggleAutoPlay(); } 
	else if (event.key==='Backspace') { resetScore(); }

});


function playGame(playerMove){
	let computerMove = getMove(Math.random());
	checkWinner(playerMove, computerMove);
}

function toggleAutoPlay(){
	if (isAutoPlaying){
		isAutoPlaying = false;
		autoPlayButton.innerHTML = 'Auto-Play';
		clearInterval(autoPlayID);
	}
	else{
		isAutoPlaying = true;
		autoPlayButton.innerHTML = 'Stop Auto-Play';
		autoPlayID = setInterval(()=>{ 
			const playerMove = getMove();
			playGame(playerMove); }, 1500);
	}
}

function resetScore() {
	score.Wins=0;
	score.Losses=0;
	score.Ties=0;
	localStorage.removeItem('score');
	updateScoreElement();
}

function checkWinner(playerMove, computerMove){
	if (playerMove === computerMove){
		result = 'Tie.';
	}
	else if (playerMove === 'rock'){
		result = (computerMove==='scissors') ? 'You win!' : 'You lose.';
	}
	else if (playerMove === 'paper'){
		result = (computerMove==='rock') ? 'You win!' : 'You lose.';
	}
	else if (playerMove === 'scissors'){
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
		<img class="move-image" src="media/${playerMove}.png">
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

function getMove(randomNumber){
	if (randomNumber<=1/3){ return 'rock';}
	else if (randomNumber>2/3){ return 'scissors'; }
	else{ return  'paper'; }
}


