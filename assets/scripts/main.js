// Get Views
const welcomeView = document.getElementById('welcome');
const gameView = document.getElementById('game');

// Get Welcome View Buttons
const btnEasy = document.getElementById('easy');
const btnMedium = document.getElementById('medium');
const btnHard = document.getElementById('hard');
const btnLeaderboard = document.getElementById('leaderboard');

function SlideToLeft() {
    const ANIMATION_PROPERTIES = "2s ease-in-out forwards";

    welcomeView.style.animation = `SlideOutToLeft ${ANIMATION_PROPERTIES}`;
    gameView.style.animation = `SlideInFromRight ${ANIMATION_PROPERTIES}`;
}

function SlideToRight() {
    const ANIMATION_PROPERTIES = "2s ease-in-out forwards";
    
    welcomeView.style.animation = `SlideInFromLeft ${ANIMATION_PROPERTIES}`;
    gameView.style.animation = `SlideOutToRight ${ANIMATION_PROPERTIES}`;
}