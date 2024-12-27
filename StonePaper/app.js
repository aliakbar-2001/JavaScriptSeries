let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll('.choice');
const message = document.querySelector('#msg');
const userScorePara = document.querySelector('#user-score');
const compScorePara = document.querySelector('#Comp-score');


const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const drawGame = () => {
    message.innerText = "Game was Draw.";
    message.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
    if(userWin){
        userScore++;
        userScorePara.innerText = userScore;
        message.innerText = `You Win! Your ${userChoice} Beats  Computer ${compChoice}`;
        message.style.backgroundColor = "green";
    }else{
        compScore++;
        compScorePara.innerText = compScore;
        message.innerText = `You Lose. Computer ${compChoice} Beats Your ${userChoice}`;
        message.style.backgroundColor = "red";
    }
};

const playGame = (userChoice) => {
    //generate computer choice -> modular
    const compChoice = genCompChoice();

    if(userChoice === compChoice){
        //Draw Game
        drawGame();
    }else{
        let userWin = true;
        if(userChoice === "rock"){
            //scissors, paper
            userWin = compChoice === "paper" ? false : true;
        }else if(userChoice === "paper"){
            //rock, scissors
            userWin = compChoice === "scissors" ? false : true;
        }else{
            //rock, paper
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        // console.log("choice was clicked", userChoice);
        playGame(userChoice); 
    });
});