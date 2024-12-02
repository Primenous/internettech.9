const questionsAndAnswers = [
    { question: "Answer is Hotdog", answer: "HOTDOG" },
    { question: "Answer is Corndog", answer: "CORNDOG" },
    { question: "Answer is Corn-dog", answer: "CORN-DOG" },
];

const maxAttempts = 6;
let currentQuestion = {};
let guessedWord = [];
let incorrectGuesses = 0;

function initializeGame(){
    currentQuestion = questionsAndAnswers[Math.floor(Math.random() * questionsAndAnswers.length)];
    // guessedWord = Array(currentQuestion.answer.length).fill("_");

    const cleanedAnswer = currentQuestion.answer.replace(/[-.]/g, "");
    guessedWord = Array.from(currentQuestion.answer).map(char => (/[A-Z]/.test(char) ? "_" : char));

    document.getElementById("question").textContent = `Question: ${currentQuestion.question}`;
    document.getElementById("wordDisplay").textContent = guessedWord.join(" ");
    document.getElementById("hangman").textContent = `Attempts left: ${maxAttempts}`;
}

function handleGuess(letter, button){   
    button.disabled = true;

    const cleanedAnswer = currentQuestion.answer.replace(/[-.]/g, "");

    if(currentQuestion.answer.includes(letter)) {
        for(let i = 0; i < currentQuestion.answer.length; i++){
            if(currentQuestion.answer[i] === letter){
                guessedWord[i] = letter;
            }
        }
        
        document.getElementById("wordDisplay").textContent = guessedWord.join(" ");

        if(!guessedWord.includes("_")){
            document.getElementById("hangman").textContent = "You Win!";
            disableAllButtons();
        }
    }else{
        incorrectGuesses++;

        document.getElementById("hangman").textContent = `Attempts left: ${maxAttempts - incorrectGuesses}`;
        document.getElementById("hangmanImage").src = `Anims/${incorrectGuesses + 1}.gif`;

        if(incorrectGuesses >= maxAttempts){
            document.getElementById("hangman").textContent = `Game Over! The answer was "${currentQuestion.answer}"`;
            disableAllButtons();
        }
    }
}

function disableAllButtons(){
    const buttons = document.querySelectorAll('.keyboard button');
    buttons.forEach(button => button.disabled = true);
}

function setupKeyboard(){
    const buttons = document.querySelectorAll('.keyboard button');
    buttons.forEach(button => {
        button.addEventListener("click", () => handleGuess(button.textContent, button));
    });
}

function restartGame(){
    incorrectGuesses = 0;

    const buttons = document.querySelectorAll('.keyboard button');
    buttons.forEach(button => button.disabled = false);

    document.getElementById("hangmanImage").src = "Anims/1.png";

    initializeGame(); 
}

document.getElementById("restartButton").addEventListener("click", restartGame);

initializeGame();
setupKeyboard();