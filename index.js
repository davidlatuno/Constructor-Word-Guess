var Word = require("./word.js");
var inquirer = require("inquirer");
var pie = new Word.Word("yellow");
var lettersGuessed = [];

function hangman() {
    var wordComplete = [];
    
    pie.objArray.forEach(completeCheck);
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
                
                if (lettersGuessed.includes(input.userinput)) {
                    console.log("Already Guessed");
                    hangman();
                } else {
                    lettersGuessed.push(input.userinput);

                    var wordCheckArray = [];

                    pie.userGuess(input.userinput);
                    pie.log();
                    pie.objArray.forEach(wordCheck);

                    if (wordCheckArray.join('') === wordComplete.join('')) {
                        console.log("Incorrect");
                    } else {
                        console.log("Correct!");
                    }
                    console.log(lettersGuessed);
                    hangman();

                    function wordCheck(key) {
                        wordCheckArray.push(key.guessed);
                    }
                }

            })
    } else {
        console.log("YOU WIN!");
    }
    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }

}

hangman();

