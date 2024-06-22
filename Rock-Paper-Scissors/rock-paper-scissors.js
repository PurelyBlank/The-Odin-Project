const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;
const ERROR = "INVALID";
const WINNING_SCORE = 5;

let humanScore = 0;
let computerScore = 0;

const humanScoreID = document.querySelector("#human-score");
const computerScoreID = document.querySelector("#computer-score");
const tieMessage = document.querySelector("#tie");
const winnerMessage = document.querySelector("#winner");
const restartButton = document.querySelector('#restart-rps');

/**
 * Gets a random integer between two numbers inclusively
 * @param {number} minNum - The minimum number bound
 * @param {number} maxNum - The maximum number bound
 * @return {number} - A random number between the minNum and maxNum
 */
function getRandomIntInclusive(minNum, maxNum) {
    const minCeiled = Math.ceil(minNum);
    const maxFloor = Math.floor(maxNum);
    return Math.floor(Math.random() * (maxFloor - minCeiled + 1) + minCeiled);
}

/**
 * Maps an integer to a choice (rock, paper, or scissors)
 * @param {number} integer - The integer to map
 * @return {number|string} - The mapped choice or ERROR if invalid
 */
function getChoiceMapping(integer) {
    return [ROCK, PAPER, SCISSORS].includes(integer) ? integer : ERROR;
}

/**
 * Maps a string choice to an integer
 * @param {string} string - The choice string
 * @return {number} - The mapped integer or -1 if invalid
 */
function reverseChoiceMapping(string) {
    switch (string) {
        case "rock": return ROCK;
        case "paper": return PAPER;
        case "scissors": return SCISSORS;
        default: return -1;
    }
}

/**
 * Generates a random computer choice (rock, paper, or scissors)
 * @return {number} - The computer's choice
 */
function getComputerChoice() {
    const randomInt = getRandomIntInclusive(1, 3);
    return getChoiceMapping(randomInt);
}

/**
 * Updates the scores and displays the current score and winner if any
 */
function updateScores() {
    humanScoreID.textContent = `Human Score: ${humanScore}`;
    computerScoreID.textContent = `Computer Score: ${computerScore}`;
}

/**
 * Checks for a winner and displays the appropriate message
 */
function checkForWinner() {
    if (humanScore === WINNING_SCORE) {
        winnerMessage.textContent = "Human Wins!";
        return true;
    }
    if (computerScore === WINNING_SCORE) {
        winnerMessage.textContent = "Computer Wins!";
        return true;
    }
    return false;
}

/**
 * Handles the game logic when a button is clicked
 * @param {Event} event - The click event
 */
function handleButtonClick(event) {
    if (humanScore === WINNING_SCORE || computerScore === WINNING_SCORE) {
        return;
    }

    const humanChoice = reverseChoiceMapping(event.target.id);
    const computerChoice = getComputerChoice();

    if (humanChoice === computerChoice) {
        tieMessage.textContent = "Tie! Same choice! No score is given to either.";
        return;
    }

    if (
        (computerChoice === ROCK && humanChoice === SCISSORS) ||
        (computerChoice === SCISSORS && humanChoice === PAPER) ||
        (computerChoice === PAPER && humanChoice === ROCK)
    ) {
        computerScore++;
    } else {
        humanScore++;
    }

    tieMessage.textContent = "";
    updateScores();

    if (checkForWinner()) {
        return;
    }
}

/**
 * Resets the game to the initial state
 */
function resetGame() {
    humanScore = 0;
    computerScore = 0;
    updateScores();
    tieMessage.textContent = "";
    winnerMessage.textContent = "";
}

// Add event listeners to buttons
const buttons = document.querySelectorAll(".rps-container button");
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

// Add event listener to restart button
restartButton.addEventListener("click", resetGame);

// Initialize scores
updateScores();
