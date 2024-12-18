const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function askQuestion(question) {
    return new Promise((resolve) => rl.question(question, resolve));
}

async function playGame() {
    console.log("Welcome to the Number Guessing Game!");
    console.log("I will pick a number within a range, and you have to guess it.");
    console.log("Let's begin!");

    const min = 1;
    const max = 100;
    const randomNumber = generateRandomNumber(min, max);

    console.log(`I've picked a number between ${min} and ${max}. Try to guess it!`);

    let attempts = 0;
    let isCorrect = false;

    while (!isCorrect) {
        const input = await askQuestion(`Enter your guess: `);
        const guess = parseInt(input, 10);

        if (isNaN(guess) || guess < min || guess > max) {
            console.log(`Please enter a valid number between ${min} and ${max}.`);
            continue;
        }

        attempts++;

        if (guess === randomNumber) {
            console.log(`Congratulations! You guessed the correct number: ${randomNumber}.`);
            console.log(`It took you ${attempts} attempts.`);
            isCorrect = true;
        } else if (guess < randomNumber) {
            console.log("Too low! Try again.");
        } else {
            console.log("Too high! Try again.");
        }
    }

    const playAgain = await askQuestion("Would you like to play again? (yes/no): ");
    if (playAgain.toLowerCase() === "yes") {
        playGame();
    } else {
        console.log("Thanks for playing! Goodbye!");
        rl.close();
    }
}

playGame();
