// Constructor initialize
var Word = require("./word.js");
var inquirer = require("inquirer");

// Used with user validation to only enter letters
var letter = "abcdefghijklmnopqrstuvwxyz";

// List of words to choose from
var state = ["alabama", "alaska", "arizona", "arkansas", "california", "colorado", "connecticut", "delaware", "florida", "georgia", "hawaii", "idaho", "illinois", "indiana", "iowa", "kansas", "kentucky", "louisiana", "maine", "maryland", "massachusetts", "michigan", "minnesota", "mississippi", "missouri", "montana", "nebraska", "nevada", "new hampshire", "new jersey", "new mexico", "new york", "north carolina", "north dakota", "ohio", "oklahoma", "oregon", "pennsylvania", "rhode island", "south carolina", "south dakota", "tennessee", "texas", "utah", "vermont", "virginia", "washington", "west virginia", "wisconsin", "wyoming"];

// Pick Random index from state array
var randomIndex = Math.floor(Math.random() * state.length);
var randomWord = state[randomIndex];

// Pass random word through Word constructor
computerWord = new Word.Word(randomWord);

var needNewWord = false;

// Array for guessed letters
var lettersGuessed = [];

// Guesses left
var guessesLeft = 10;

function hangman() {

    if (needNewWord) {
        // Pick Random index from state array
        var randomIndex = Math.floor(Math.random() * state.length);
        var randomWord = state[randomIndex];

        // Pass random word through Word constructor
        computerWord = new Word.Word(randomWord);

        // Turn off Generator
        needNewWord = false;
    }


    // Variable and function used to test if a letter guessed is correct
    var wordComplete = [];
    computerWord.objArray.forEach(completeCheck);

    // Check if word has letters still to be guessed
    if (wordComplete.includes(false)) {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Guess a letter!",
                    name: "userinput"
                }
            ])
            .then(function (input) {

                if (!letter.includes(input.userinput) || input.userinput.length > 1) {
                    console.log("\nNot a Letter or too many inputs\n");
                    hangman();
                } else {

                    // User Validation to not be able enter same letters more than once and only one letter at a time
                    if (lettersGuessed.includes(input.userinput) || input.userinput === "") {
                        console.log("\nAlready Guessed or Nothing Entered\n");
                        hangman();
                    } else {

                        // Add guessed letter to array
                        lettersGuessed.push(input.userinput);

                        // Compare with word complete to see if a guess was correct
                        var wordCheckArray = [];

                        // Run guess through word constructor method to check if word includes use letter
                        computerWord.userGuess(input.userinput);

                        // Compare with word complete to see if a guess was correct
                        computerWord.objArray.forEach(wordCheck);
                        if (wordCheckArray.join('') === wordComplete.join('')) {
                            console.log("\nIncorrect\n");
                            guessesLeft--;
                        } else {
                            console.log("\nCorrect!\n");
                        }

                        // Print the word to terminal
                        computerWord.log();

                        // Print guesses left
                        console.log("Guesses Left: " + guessesLeft + "\n");

                        if (guessesLeft > 0) {
                            // Call function again till word is complete
                            hangman();
                        } else {
                            console.log("YOU LOSE!\n");

                            restartGame();
                        }


                        // Function used with wordCheckArray forEach
                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        }
                    }
                }
            })
    } else {
        console.log("YOU WIN!\n");

        restartGame();
    }

    // Function used with wordComplete forEach
    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }

}

function restartGame() {
    inquirer
            .prompt([
                {
                    type: "list",
                    message: "Would you like to:",
                    choices: ["Play Again", "Exit"],
                    name: "restart"
                }
            ])
            .then(function (input) {
                if (input.restart === "Play Again") {
                    needNewWord = true;
                    lettersGuessed = [];
                    guessesLeft = 10;
                    hangman();
                } else {
                    return
                }
            })
}

hangman();

