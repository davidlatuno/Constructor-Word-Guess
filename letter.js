function Letter(value) {
    this.letter = value;
    this.guessed = false;
    this.print = function() {
        if (this.guessed === false) {
            return "_";
        } else {
            return this.letter;
        }
    };
    this.guess = function(guess) {
        if (guess === this.letter) {
            this.guessed = true;
        }
    }
}

exports.Letter = Letter;