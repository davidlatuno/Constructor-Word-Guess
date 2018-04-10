function Letter(value) {
    this.letter = value;
    this.guessed = false;
    this.print = function () {
        // Added functionality for computer Guess with more than one word
        if (this.letter === " ") {
            this.guessed = true;
            return " ";
        } else {
            if (this.guessed === false) {
                return "_";
            } else {
                return this.letter;
            }
        }
    };
    // Check if user guess is the same value
    this.guess = function (guess) {
        if (guess === this.letter) {
            this.guessed = true;
        }
    }
}

exports.Letter = Letter;