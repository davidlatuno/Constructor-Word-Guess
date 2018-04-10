// Constructor initialize
var Word = require("./word.js");
var inquirer = require("inquirer");


var pie = new Word.Word("yellow");
// Array for guessed letters
var lettersGuessed = [];

function hangman() {
    // Variable and function used to test if a letter guessed is correct
    var wordComplete = [];
    pie.objArray.forEach(completeCheck);

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

                // User Validation to not be able enter same letters more than once
                if (lettersGuessed.includes(input.userinput)) {
                    console.log("Already Guessed");
                    hangman();
                } else {

                    // Add guessed letter to array
                    lettersGuessed.push(input.userinput);

                    // Compare with word complete to see if a guess was correct
                    var wordCheckArray = [];

                    // Run guess through word constructor method to check if word includes use letter
                    pie.userGuess(input.userinput);
                    // Print the word to terminal
                    pie.log();

                    // Compare with word complete to see if a guess was correct
                    pie.objArray.forEach(wordCheck);
                    if (wordCheckArray.join('') === wordComplete.join('')) {
                        console.log("Incorrect");
                    } else {
                        console.log("Correct!");
                    }

                    // Call function again till word is complete
                    hangman();

                    // Function used with wordCheckArray forEach
                    function wordCheck(key) {
                        wordCheckArray.push(key.guessed);
                    }
                }

            })
    } else {
        console.log("YOU WIN!");
    }
    // Function used with wordComplete forEach
    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }

}

hangman();

