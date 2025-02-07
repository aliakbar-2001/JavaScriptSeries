console.log("Welcome to Tic Tac Toe");
let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isgameover = false;

// Toggle music button
const toggleMusicButton = document.getElementById('toggle-music');

// Variable to track music state
let isMusicPlaying = false;

// Function to toggle music
toggleMusicButton.addEventListener('click', () => {
    if (isMusicPlaying) {
        music.pause();
        music.currentTime = 0; // Reset music to the start
        toggleMusicButton.innerText = "Start Music";
    } else {
        music.play();
        music.loop = true; // Loop the music
        toggleMusicButton.innerText = "Stop Music";
    }
    isMusicPlaying = !isMusicPlaying; // Toggle the state
});


// Function to change the turn
const changeTurn = ()=>{
    return turn === "X" ? "0" : "X";
}

// Function to check for a win
const checkWin = ()=>{
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];
    wins.forEach(e =>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && 
           (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && 
           (boxtext[e[0]].innerText !== "")){
            document.querySelector('.info').innerText = " Congratulations " + boxtext[e[0]].innerText + " Won";
            isgameover = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";
        }
    });
}

// Function to check for a draw
const checkDraw = ()=>{
    let boxtext = document.getElementsByClassName('boxtext');
    let allFilled = Array.from(boxtext).every(element => element.innerText !== "");
    if (allFilled && !isgameover) {
        document.querySelector('.info').innerText = "It's a Draw!";
        isgameover = true;
        gameover.play();
    }
}

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(boxtext.innerText === '' && !isgameover){
            boxtext.innerText = turn;
            audioTurn.play();
            checkWin();
            if (!isgameover){
                turn = changeTurn();
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
            checkDraw();
        }
    });
});

// Add onclick listener to reset button
reset.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X"; 
    isgameover = false;
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
});
