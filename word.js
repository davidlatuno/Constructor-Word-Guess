var Letter = require("./letter.js");

function Word(answer) {
    var objArray = [];
    var answerArray = answer.split("");
    for (var i = 0; i < answer.length; i++) {
        var letter = new Letter.Letter(answerArray[i]);
        objArray.push(letter);
    }
    this.log = function() {
        answerLog = "";
        for (var i = 0; i < objArray.length; i++) {
            answerLog += objArray[i].print() + " ";
        }
        console.log(answerLog);
    }
    this.userGuess = function(input) {
        for (var i = 0; i < objArray.length; i++) {
            objArray[i].guess(input);
        }
    }
}