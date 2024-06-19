/*
* Notes:
*   Although we could use a hashmap for storing rock, paper, scissors into its respective values 1, 2, 3,
*   we are going to leave it simple here since we won't go beyond three values
*/

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;
const ERROR = "INVALID"

let humanScore = 0;
let computerScore = 0;

/*
* Gets a random integer between two numbers inclusively
* @param minNum: the minimum number bound
* @param maxNum: the maximum number bound
* @return: returns a random number between the minNum and maxNum
*/
function getRandomIntInclusive(minNum, maxNum) {
    // minNum and maxNum are floored assuming the parameters are not strictly integers
    const minCeiled = Math.ceil(minNum);
    const maxFloor = Math.floor(maxNum);
    return Math.floor(Math.random() * (maxFloor - minCeiled + 1) + minCeiled);
}

/*
* returns the mapping from integer to rock, paper, or scissors
*/
let getChoiceMapping = (integer) => [ROCK, PAPER, SCISSORS].includes(integer) ? integer : ERROR; 

/*
* @return : returns either rock, paper, or scissors
*           1 = rock
*           2 = paper
*           3 = scissors
*/
function getComputerChoice() {
    const randomInt = getRandomIntInclusive(1, 3);
    return getChoiceMapping(randomInt); 
}

/*
* @return : returns either rock, paper, or scissors based on user input or INVALID if 
*/
function getHumanChoice() {
    let input = parseInt(prompt("Pick 1 (Rock), 2 (Paper), or 3 (Scissors)"));
    return getChoiceMapping(input);
}


/*
* runs a single round of rock, paper, scissors
* 
* Possibilities
*   ROCK beats SCISSORS
*   SCISSORS beats PAPER
*   PAPER beats ROCK
*/
function runRound() {
    computerChoice = getComputerChoice();
    humanChoice = getHumanChoice();
    if (computerChoice == humanChoice) {
        // both players get a point for simplicity sake
        ++humanScore;
        ++computerScore;
        console.log("Tie")
    }
    if (computerChoice == ROCK && humanChoice == SCISSORS || 
        computerChoice == SCISSORS && humanChoice == PAPER || 
        computerChoice == PAPER && humanChoice == ROCK) {
        console.log("Computer wins this round!");
        ++computerScore;
    }
    else {
        console.log("Human wins this round!");
        ++humanScore;
    }
}

/*
* runs an entire game of rock, paper, scissors
*/
function runGame() {
    const num_rounds = 5;
    for (let i = 0; i < num_rounds; ++i) {
        value = runRound();
        console.log("Human Score: " + humanScore);
        console.log("Computer Score: " + computerScore);
    }
    console.log("----- GAME RESULT -----");
    if (humanScore == computerScore) {
        console.log("TIE!");
    }
    else if (humanScore > computerScore) {
        console.log("Human User Wins!");
    }
    else {
        console.log("Computer Wins!");
    }
}

// Runs Computer Random Choice
// const computerChoice = getComputerChoice();
// console.log(computerChoice);

// Runs Human Choice
// const humanChoice = getHumanChoice();
// console.log(humanChoice);

runGame();