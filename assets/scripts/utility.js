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

function setGridSize(size) {
	gameGrid.classList.remove('medium');
	gameGrid.classList.remove('large');
	gameGrid.classList.remove('small');

	gameGrid.classList.add(size);
}