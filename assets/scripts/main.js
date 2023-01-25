// Tiles Source Object 
const TILES_SOURCE = {
    tile1 : {id: 1, src: "./assets/img/1.png"},
    tile2 : {id: 2, src: "./assets/img/2.png"},
    tile3 : {id: 3, src: "./assets/img/3.png"},
    tile4 : {id: 4, src: "./assets/img/4.png"},
    tile5 : {id: 5, src: "./assets/img/5.png"},
    tile6 : {id: 6, src: "./assets/img/6.png"},
    tile7 : {id: 7, src: "./assets/img/7.png"},
    tile8 : {id: 8, src: "./assets/img/8.png"},
    tile9 : {id: 9, src: "./assets/img/9.png"},
    tile10 : {id: 10, src: "./assets/img/10.png"},
    tile11 : {id: 11, src: "./assets/img/11.png"},
    tile12 : {id: 12, src: "./assets/img/12.png"},
    tile13 : {id: 13, src: "./assets/img/13.png"},
    tile14 : {id: 14, src: "./assets/img/14.png"},
    tile15 : {id: 15, src: "./assets/img/15.png"},
    tile16 : {id: 16, src: "./assets/img/16.png"},
    tile17 : {id: 17, src: "./assets/img/17.png"},
    tile18 : {id: 18, src: "./assets/img/18.png"},
    tile19 : {id: 19, src: "./assets/img/19.png"},
    tile20 : {id: 20, src: "./assets/img/20.png"},
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
const gameClock = document.getElementById('game-clock');
const gameGrid = document.getElementById('game-grid')
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