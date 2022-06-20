// Selector 

let bg = document.querySelector('.bg');

let rulesContainer = document.querySelector('.rules-container');

let rulesBtn = document.querySelector('.rules');

let closeRules = document.querySelector('.close')

let gameContainer = document.querySelector('.game-container');

let choseContainer = document.querySelector('.chose-container');

let youChose = document.querySelector('.first-chose .chose');

let houseChose = document.querySelector('.second-chose .chose');

let result = document.querySelector('.result');

let playAgain = document.querySelector(".play-again");

let score = document.querySelector('.score span');

let win = document.querySelector('.win');

let lose = document.querySelector('.lose');

let draw = document.querySelector('.draw');

let plusOne = document.querySelector('.score .addOne');

let playerChose;


// Control volume effect
win.volume = .5;
lose.volume = .5;



// Show Rules
rulesBtn.onclick = (e) => {
    bg.style.display = 'block';
    rulesContainer.style.display = 'flex';
}

// Hide
closeRules.onclick = (e) => {
    bg.style.display = 'none';
    rulesContainer.style.display = 'none';
}
bg.onclick = (e) => {
    bg.style.display = 'none';
    rulesContainer.style.display = 'none';
}

// Get Player Chose
gameContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('paper') || e.target.parentElement.classList.contains('paper') || e.target.parentElement.parentElement.classList.contains('paper')) {
        applyChose("paper");
        playerChose = "paper";
    }
    if (e.target.classList.contains('scissors') || e.target.parentElement.classList.contains('scissors') || e.target.parentElement.parentElement.classList.contains('scissors')) {
        applyChose("scissors");
        playerChose = "scissors";
    }
    if (e.target.classList.contains('rock') || e.target.parentElement.classList.contains('rock') || e.target.parentElement.parentElement.classList.contains('rock')) {
        applyChose("rock");
        playerChose = "rock";
    }
})

// 
if (localStorage.getItem('score')) {
    score.innerHTML = localStorage.getItem('score');
} else {
    score.innerHTML = 0;
}

//
function applyChose(playerChose) {

    gameContainer.style.display = 'none';
    choseContainer.style.display = "flex";

    createMove(playerChose, youChose);

    TheHouseChose();
}

//
function createMove(playerChose, parent) { 
    let cover = document.createElement('div');
    cover.className = `cover ${playerChose}`;

    let circule = document.createElement('div');
    circule.className = 'circule';

    let img = document.createElement('img')
    img.src = `img/icon-${playerChose}.svg`;
    img.alt = playerChose;

    circule.appendChild(img);
    cover.appendChild(circule);
    parent.appendChild(cover);
}

//
function TheHouseChose() {
    let array = [1, 2, 3];
    let random = Math.floor(Math.random() * array.length);

    let arrayOfMoves = ["paper", "scissors", "rock"];

    setTimeout(() => { 
        createMove(arrayOfMoves[random], houseChose) ;
        checkWinner();
    }, 1500);
    
}

//
function checkWinner() {
    result.style.display = 'inline-block';

    if (youChose.children[0].classList.contains('paper') && houseChose.children[1].classList.contains('paper')) {
        result.children[0].innerHTML = "Draw!";
    }
    if (youChose.children[0].classList.contains('paper') && houseChose.children[1].classList.contains('scissors')) {
        result.children[0].innerHTML = "YOU LOSE";
    }
    if (youChose.children[0].classList.contains('paper') && houseChose.children[1].classList.contains('rock')) {
        result.children[0].innerHTML = "YOU WIN";
        score.innerHTML = parseInt(score.innerHTML) + 1;
        addOne();
    }
    if (youChose.children[0].classList.contains('scissors') && houseChose.children[1].classList.contains('scissors') ) {
        result.children[0].innerHTML = "Draw!";
    }
    if (youChose.children[0].classList.contains('scissors') && houseChose.children[1].classList.contains('paper') ) {
        result.children[0].innerHTML = "YOU WIN";
        score.innerHTML = parseInt(score.innerHTML) + 1;
        addOne();
    }
    if (youChose.children[0].classList.contains('scissors') && houseChose.children[1].classList.contains('rock') ) {
        result.children[0].innerHTML = "YOU LOSE";
    }
    if (youChose.children[0].classList.contains('rock') && houseChose.children[1].classList.contains('rock')) {
        result.children[0].innerHTML = "Draw!";
    }
    if (youChose.children[0].classList.contains('rock') && houseChose.children[1].classList.contains('paper')) {
        result.children[0].innerHTML = "YOU LOSE";
    }
    if (youChose.children[0].classList.contains('rock') && houseChose.children[1].classList.contains('scissors')) {
        result.children[0].innerHTML = "YOU WIN";
        score.innerHTML = parseInt(score.innerHTML) + 1;
        addOne();
    }

    localStorage.setItem('score', parseInt(score.innerHTML));

    setTimeout(() => {
        checkWinnerShadow();
    }, 100);
}

// Assing Play Again
playAgain.onclick = (e) => {
    window.location.reload();
}

// 
function checkWinnerShadow() {
    if (result.children[0].innerHTML === 'YOU WIN') {
        youChose.classList.add('winner');
        win.play();
    } else if (result.children[0].innerHTML === 'YOU LOSE') {
        houseChose.classList.add('winner');
        lose.play();
    } else if (result.children[0].innerHTML === 'Draw!') {
        draw.play();
    }
}

// Animation To Add One To Score
function addOne() {
    plusOne.style.opacity = 1;
    plusOne.style.animationPlayState = 'running';
}

