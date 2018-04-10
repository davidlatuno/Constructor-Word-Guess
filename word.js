var Letter = require("./letter.js");

function Word(answer) {
    // Array to hold Letter objects
    this.objArray = [];
    // Split passed word into Letter objects and push into above array
    for (var i = 0; i < answer.length; i++) {
        var letter = new Letter.Letter(answer[i]);
        this.objArray.push(letter);
    }
    // Print word to console (using Letter methods some may be hidden if not guessed yet)
    this.log = function () {
        answerLog = "";
        for (var i = 0; i < this.objArray.length; i++) {
            answerLog += this.objArray[i].print() + " ";
        }
        console.log(answerLog + "\n");
    }
    // Pass user's guess through Letter method guess to check if it matches any of the letters in array
    this.userGuess = function (input) {
        for (var i = 0; i < this.objArray.length; i++) {
            this.objArray[i].guess(input);
        }
    }
}

exports.Word = Word;