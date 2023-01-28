// Tiles Source Object
const GAME_DATA = {
	tile1: { id: 1, src: './assets/img/1.png' },
	tile2: { id: 2, src: './assets/img/2.png' },
	tile3: { id: 3, src: './assets/img/3.png' },
	tile4: { id: 4, src: './assets/img/4.png' },
	tile5: { id: 5, src: './assets/img/5.png' },
	tile6: { id: 6, src: './assets/img/6.png' },
	tile7: { id: 7, src: './assets/img/7.png' },
	tile8: { id: 8, src: './assets/img/8.png' },
	tile9: { id: 9, src: './assets/img/9.png' },
	tile10: { id: 10, src: './assets/img/10.png' },
	tile11: { id: 11, src: './assets/img/11.png' },
	tile12: { id: 12, src: './assets/img/12.png' },
	tile13: { id: 13, src: './assets/img/13.png' },
	tile14: { id: 14, src: './assets/img/14.png' },
	tile15: { id: 15, src: './assets/img/15.png' },
	tile16: { id: 16, src: './assets/img/16.png' },
	tile17: { id: 17, src: './assets/img/17.png' },
	tile18: { id: 18, src: './assets/img/18.png' },
	tile19: { id: 19, src: './assets/img/19.png' },
	tile20: { id: 20, src: './assets/img/20.png' }
};

function initialiseGameState(gridSize, itemNumber, scoreboard, timer, endElements) {
	slideViewRTL();
	setGridSize(gridSize);

	return new GameState(GAME_DATA, itemNumber, gameGrid, scoreboard, timer, endElements)
}

function attachClickHandlers(handler) {
	let items = document.querySelectorAll('.card')

	items.forEach(item => item.addEventListener('click', function () {
		handler.ProcessClick(this);
	}));
}

function Reset() {
	window.location.reload(false);
}

function ShowModalRegister() {
	modalRegister.style.display = 'flex';
}

function SortLeaderboard() {
	leaderboard = leaderboard.sort((a, b) => a < b);
}


let gameState;
let gameEndElements = [modalGameOver, gameScore, gameTime];
let stateSetup;

let leaderboard = localStorage.getItem('leaderboard');
console.log(leaderboard)

if(leaderboard) {
	console.log(leaderboard)
	SortLeaderboard();
}else {
	leaderboard = [];
}


console.log(gameEndElements)


btnEasy.addEventListener('click', function () {
	stateSetup = ['small', 4, gameScoreDisplay, gameTimeDisplay, gameEndElements];
	gameState = initialiseGameState('small', 4, gameScoreDisplay, gameTimeDisplay, gameEndElements);
	attachClickHandlers(gameState);
})

btnMedium.addEventListener('click', function () {
	stateSetup = ['medium', 12, gameScoreDisplay, gameTimeDisplay, gameEndElements];
	gameState = initialiseGameState('medium', 12, gameScoreDisplay, gameTimeDisplay, gameEndElements);
	attachClickHandlers(gameState);
})

btnHard.addEventListener('click', function () {
	stateSetup = ['large', 18, gameScoreDisplay, gameTimeDisplay, gameEndElements];
	gameState = initialiseGameState('large', 18, gameScoreDisplay, gameTimeDisplay, gameEndElements);
	attachClickHandlers(gameState);
})

btnResetGame.addEventListener('click', function() {
	Reset();
})

btnDontResetGame.addEventListener('click', function() {
	ShowModalRegister();
})

formElement.addEventListener('submit', function(event) {
	event.preventDefault();
	let name = formInput.value;
	let score = +gameScoreDisplay.innerHTML;

	let player = {name, score};

	leaderboard.push(player);
	SortLeaderboard();

	localStorage.clear('leaderboard');
	localStorage.setItem('leaderboard', leaderboard);
})

