function Letter(value) {
    this.letter = value;
    this.guessed = false;
    this.print = function() {
        if (this.guessed === false) {
            console.log("_");
        } else {
            console.log(this.letter);
        }
    };
    this.guess = function(guess) {
        if (guess === this.letter) {
            this.guessed = true;
        }
    }
}

var a = new Letter("a");

a.print();
a.guess("b");
a.print();
a.guess("a");
a.print();