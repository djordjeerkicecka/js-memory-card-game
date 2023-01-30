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

const ANIMATION_DATA = '1s ease-in-out forwards';

function startGame(fieldSize, items, componentRefs) {
	let [fieldRef, matchesRef, timeRef, modalRef] = componentRefs;

	setPlayingFieldSize(fieldRef, fieldSize);

	return new GameState(GAME_DATA, items, fieldRef, matchesRef, timeRef, modalRef);
}

function attachClickHandlers(handler) {
	let items = document.querySelectorAll('.card');

	items.forEach(item => item.addEventListener('click', function () {
		handler.ProcessClick(this);
	}));
}

function animateWindow(startRef, gameRef) {
	startRef.classList.add('slideOut');
	gameRef.classList.add('slideIn');
}

function setPlayingFieldSize(field, size) {
	field.classList.remove('medium');
	field.classList.remove('large');
	field.classList.remove('small');

	field.classList.add(size);
}

function Reset() {
	window.location.reload(false);
}

function ShowModalRegister(modalRef) {
	modalRef.classList.add('open');
}

function CheckForHighscore(highmatchesRef) {
	let time = localStorage.getItem('time');

	if(time) highmatchesRef.innerHTML = `Current fastest time : ${time} seconds`;
}


let gameState;
const modalRefs = [modalGameOver, modalStatusMatches, modalStatusTime];
const componentRefs = [playingField, statusMatches, statusTime, modalRefs];

// Scroll To Top On Page Load
(function() {
	window.scrollTo(0, 0)
})

CheckForHighscore(startFastestTime);

startBtnEasy.addEventListener('click', function () { 
	animateWindow(windowStart, windowGame);
	gameState = startGame('small', 10, componentRefs);
	attachClickHandlers(gameState);
});

startBtnMedium.addEventListener('click', function () { 
	animateWindow(windowStart, windowGame);
	gameState = startGame('medium', 12, componentRefs);
	attachClickHandlers(gameState);
});

startBtnHard.addEventListener('click', function () { 
	animateWindow(windowStart, windowGame);
	gameState = startGame('large', 15, componentRefs);
	attachClickHandlers(gameState);
});

modalBtnConfirm.addEventListener('click', Reset)