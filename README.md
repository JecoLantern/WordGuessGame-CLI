Word Guess Game on CLI app uses Javascript that focuses on the use of Constructors as well as NPM packages, specifically Inquirer.

To play the game on CLI, type "node index.js".

HOW TO Play: 
1) When asked for a letter, press any letter key (a-z) from the keyboard to guess a letter and press Enter key to continue.
2) Your letter of choice will either be correct or incorrect. You will then receive a message if you have entered more than one letter at a time.
3) For every incorrect guess, your number of available guesses decrease by one.
4) If your guessed letter is correct, then it populates the corresponding 'asterisk*' in the word.
5) You win the round if you have correctly guessed all the letters in the given word before the number of available guesses reaches 0.
6) You lose the round if your available guess becomes zero before the entire word is revealed. The next word will display.

NOTE 1: You can exit the game at any time by pressing CTRL + 'C' from your keyboard.
NOTE 2: WordGuessGame on CLI will not track wins and losses. Chosen words and/or already Guessed words will repeat.