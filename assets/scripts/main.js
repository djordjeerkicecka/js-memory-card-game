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

// Get Views
const viewWelcome = document.getElementById('welcome');
const viewGame = document.getElementById('game');

// Get View Buttons
const btnEasy = document.getElementById('easy');
const btnMedium = document.getElementById('medium');
const btnHard = document.getElementById('hard');

// Utility Buttons
const btnShowLeaderboard = document.getElementById('btn-leaderboard');

// Dynamic Game Elements
const gameTimeDisplay = document.getElementById('game-clock');
const gameScoreDisplay = document.getElementById('game-score');
const gameGrid = document.getElementById('game-grid');
const gameMatches = document.getElementById('game-matches');
const gameTime = document.getElementById('game-time');

// Modal Buttons
const btnResetGame = document.getElementById('play-again-yes');
const btnDontResetGame = document.getElementById('play-again-no');

// Form
const formElement = document.getElementById('input-form');

// Leaderboard
const tableBody = document.getElementById('table-body');
const btnPlayAgain = document.getElementById('play-again');

class GameState {
	#sourceData;
	#uniqueElementCount;
	#selected;
	#score;
	#pairsToMatch;

	constructor(sourceData, uniqueElementCount) {
		this.#sourceData = sourceData;
		this.#uniqueElementCount = uniqueElementCount;
		this.#score = 0;
		this.#selected = [];
		this.#pairsToMatch = uniqueElementCount;

		this.Render();
	}

	// Render elements on screen
	Render() {
		let source = this.GenerateArrayFromSource();
		let nodes = this.GenerateMarkupFromArray(source);

		nodes.forEach(node => gameGrid.appendChild(node));
	}

	// Map source data to an array
	GenerateArrayFromSource() {
		let items = [];

		Object.values(this.#sourceData).forEach(value => items.push(value)); // Map object values to array

		let selection = [];

		// Select random items from array
		while (selection.length < this.#uniqueElementCount) {
			let index = this.#GetNumber(items.length);

			selection.push(...items.splice(index, 1));
		}

		selection = [...selection, ...selection]; // Duplicate selected array

		let randomised = [];

		// Randomise selected array
		while (randomised.length < this.#uniqueElementCount * 2) {
			let index = this.#GetNumber(selection.length);

			randomised.push(...selection.splice(index, 1));
		}

		return randomised;
	}

	// Generate elements
	GenerateMarkupFromArray(data) {
		let nodes = [];

		data.forEach(item =>
			nodes.push(this.GenerateNodeFromData(item.id, item.src))
		);

		return nodes;
	}

	// Generate single element
	GenerateNodeFromData(id, src) {
		let node = document.createElement('div');
		node.classList.add('card');
		node.setAttribute('data-id', id);
		node.addEventListener('click', function () {
			gameState.RegisterClick(this);
		});

		let childNode = document.createElement('img');
		childNode.classList.add('card-img');
		childNode.setAttribute('src', src);
		childNode.setAttribute('alt', `cardImgID${id}`);

		node.appendChild(childNode);
		return node;
	}

	// Register click on game grid
	RegisterClick(element) {
		if (element.classList.contains('clicked')) return; // Ignore repeated clicks on opened tile
		if (this.#selected.length === 2) return; // Ignore clicks if two cards are open

		element.classList.add('clicked');
		this.#selected.push(element);

		if (this.#selected.length === 2) {
			if (this.#GetId(this.#selected[0]) === this.#GetId(this.#selected[1])) {
				this.#score++;
				this.#pairsToMatch--;
				this.#selected = [];

				this.#UpdateScore();

				if (this.#pairsToMatch === 0) {
					setTimeout(() => {
						alert('You Won!');
					}, 400);
				}
			} else {
				setTimeout(() => {
					this.#selected.forEach(item => item.classList.remove('clicked'));
					this.#selected = [];
				}, 400);
			}
		}
	}

	// Get id from element
	#GetId(element) {
		return element.dataset.id;
	}

	// Generate a random number in a range from [0, multiplier)
	#GetNumber(multiplier) {
		return Math.floor(Math.random() * multiplier);
	}

	#UpdateScore() {
		gameScoreDisplay.innerHTML = this.#score;
	}
}

class GameClock {
	#time;
	#clockRef;

	constructor() {
		this.#time = -1; // OFFSET TO COMPENSATE ANIMATION
		this.#clockRef = this.#StartTime();
	}

	#StartTime() {
		return setInterval(() => {
			this.#time++;
			this.#UpdateTime(this.#time);
			console.log(this.#time);
		}, 1000);
	}

	StopTime() {
		clearInterval(this.#clockRef);
	}

	#UpdateTime(newTime) {
		gameTimeDisplay.innerHTML = newTime;
	}

	GetTime() {
		return this.#time;
	}
}

// Slide view from right to left
function slideViewRTL() {
	const ATTRIBUTE_VALUE = '1s ease-in-out forwards';

	viewWelcome.style.animation = `SlideOutToLeft ${ATTRIBUTE_VALUE}`;
	viewGame.style.animation = `SlideInFromRight ${ATTRIBUTE_VALUE}`;
}

// Slide view from left to right
function slideViewLTR() {
	const ATTRIBUTE_VALUE = '1s ease-in-out forwards';
	viewWelcome.style.animation = `SlideInFromLeft ${ATTRIBUTE_VALUE}`;
	viewGame.style.animation = `SlideOutToRight ${ATTRIBUTE_VALUE}`;
}

let gameState;
let gameClock;


function setGridSize(size) {
	gameGrid.classList.remove('medium');
	gameGrid.classList.remove('large');
	gameGrid.classList.remove('small');

	gameGrid.classList.add(size);
}


btnEasy.addEventListener('click', function () {
	setGridSize('small');
	gameState = new GameState(GAME_DATA, 8);
	//gameClock = new GameClock();
	slideViewRTL();
});
btnMedium.addEventListener('click', function () {
	setGridSize('medium');
	gameState = new GameState(GAME_DATA, 12);
	//gameClock = new GameClock();
	slideViewRTL();
});
btnHard.addEventListener('click', function () {
	setGridSize('large');
	gameState = new GameState(GAME_DATA, 18);
	//gameClock = new GameClock();
	slideViewRTL();
});
