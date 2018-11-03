var inquirer = require("inquirer");
var Word = require("./word.js");
var chalk = require("chalk");
var figlet = require("figlet");

var hangmanFigletized = "Hangman";
figlet(hangmanFigletized, function(err, data) {
    if (err) {
        console.log("Something wrong...");
        console.dir(err);
        return;
    }
    console.log(chalk.hex("#329999")(data));
    console.log(chalk.hex("#71cc0a")("WELCOME to WordGuessGame on CLI"));
    console.log(chalk.hex("#71cc0a")("The theme is: Disney Movies!"));

    var howToPlay = 
        chalk.hex("#eaa524")("*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*" + "\r\n" +
        "HOW TO Play" + "\r\n" +
        "*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*" + "\r\n" +
        "When asked for a letter, press any letter key (a-z) from the keyboard to guess a letter and press Enter key to continue." + "\r\n" + "Your letter of choice will either be correct or incorrect. You will then receive a message if you have entered more than one letter at a time." + "\r\n" + "For every incorrect guess, your number of available guesses decrese by one." + "\r\n" + "If your guessed letter is correct, then it populates the corresponding '_' in the word." + "\r\n" + "You win the round if you have correctly guessed all the letters in the given word before the number of available guesses reaches 0." + "\r\n" + "You lose the round if your available guess becomes zero before the entire word is revealed. The next word will display." + "\r\n" + "*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*" + "\r\n" +
        "You can exit the game at any time by pressing CTRL + 'C' from your keyboard." + "\r\n" + "*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*")
    console.log(howToPlay);
    confirmStart();
});

function confirmStart() {
    inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: 'Ready to Play?',
        choices: ['Oh Yeah!', 'Heck Yeah!']
    }]).then(function(answers){
        if (answers.choices == 'Oh Yeah!' || 'Heck Yeah!') {
            var playGame = function() {
                var gameWord = new Word();
                var guesses = 8;
                var guessedLetters = [];

                function displayWord(ele) {
                    console.log(ele + '');
                }

                gameWord.selectRandomWord();
                console.log(chalk.hex('#eaa524')("\n___NEW GAME___\n"));
                displayWord(gameWord);

                var askForLetter = function() {
                    if (guesses > 0) {
                        inquirer.prompt([{
                            type: 'input',
                            meesage: 'Guess a Letter!',
                            name: 'letter'
                        }]).then(function(answers) {
                            if (answers.letter.length === 1) {

                                if(guessedLetters.indexOf(answers.letter) && guessedLetters.lastIndexOf(answers.letter) === -1) {
                                guessedLetters.push(answers.letter);

                                var found = gameWord.makeGuess(answers.letter);

                                if (found) {
                                    console.log(chalk.hex('#71cc0a')("\nCORRECT!\n"));
                                }else{
                                    guesses--;
                                    console.log(chalk.red("\nINCORRECT\n"));
                                };

                                if (guesses === 1) {
                                    console.log(chalk.hex('#329999')(guesses + " guess remaining\n"))
                                }else{
                                    console.log(chalk.hex('#329999')(guesses + " guesses remaining\n"))
                                };

                                if (guesses != 0) {
                                    displayWord(gameWord);
                                };

                                if(!gameWord.wordSolved()) {
                                    askForLetter();
                                }else{
                                    console.log(chalk.hex('#329999')("CORRECT! Next Word."));
                                    playGame();
                                }
                            }else{
                                console.log(chalk.hex('#eaa524')("\nYou've already guessed this letter. Try another letter.\n"));
                                askForLetter();
                            }
                        }else{
                            console.log(chalk.hex('#eaa524')("\nPlease Enter only ONE letter and try again.\n"));
                            askForLetter();
                        }
                        });
                    }else {
                        console.log(chalk.red("GAME OVER!!\n"));
                        console.log(chalk.red("The answer was: " + gameWord.guessWord + ". Initializing Game Again.\n"));
                        playGame();
                    }
                }
                askForLetter();
            };
            playGame();
        }
    })
}