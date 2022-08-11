//CSS
import './App.css';
//REACT
import { useCallback, useEffect, useState } from "react";
//DATA
import { wordsList } from './data/word';
//CONPONENTS
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end"},
];
const guessesQty = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState (wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetter, setWrongLetter] = useState([]);
  const [guesses, setGuesses] = useState([guessesQty]);
  const [score, setScore] = useState([])

  const pickedWordAndCategory = useCallback (() => {
    const categories = Object.keys(words); 
    const category = 
    categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // pick a rondom word
    const word =  words[category][Math.floor(Math.random() * words[category].length)];
    
    return {word, category}
  }, [words]);


// start the secret word game
const startGame = useCallback ( () => {

  // clear all latters
  clearLetterStates();

  //Pick word end pick category
 const {word, category} = pickedWordAndCategory();

 // CREATe an array of latter
 let wordLetters = word.split("");

 wordLetters = wordLetters.map((l) => l.toLowerCase())

 
 // fill state

 setPickedWord(word);
 setPickedCategory(category);
 setLetters(wordLetters);

 setGameStage(stages[1].name);
},[pickedWordAndCategory]);

// porcess the latter input
const verifyLetter = (letter) => {
 const normalizedLetter = letter.toLowerCase()

 // check if letter has already been utilized

 if(guessedLetters.includes(normalizedLetter) || wrongLetter.includes(normalizedLetter)) 
 {
  return;
 }

 // push guessed letter or remove a guess

 if(letters.includes(normalizedLetter)){
    setGuessedLetters((actualGuessedLetters) => [
      ...actualGuessedLetters, normalizedLetter,
    ]); 
 } else {
  setWrongLetter((actualWrongLetters) => [
    ...actualWrongLetters, normalizedLetter,
  ]);
    setGuesses((actualGuessed) => actualGuessed - 1)
 }
};
const clearLetterStates = () => {
  setGuessedLetters ([])
  setWrongLetter ([])
};

//check if guesses ended

useEffect(() => {

  if(guesses <= 0) {
    // reset all states
    clearLetterStates();

    setGameStage(stages[2].name)
  }
}, [guesses])

// check win condition

useEffect (() => {

  //creat unique letters
  const uniqueLetters = [...new Set(letters)]

  //win condition
  if(guessedLetters.length === uniqueLetters.length) {
      // add score
      setScore((actualScore) => (actualScore += 100));

      // restart game with new word
      startGame();

  }
 

}, [guessedLetters, letters, startGame]);

//restar the game
const retry = () => {
  setScore (0);
  setGuesses(guessesQty);
  setGameStage(stages[0].name)
};

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && (
        <Game 
          verifyLetter={verifyLetter}
          pickedWord={pickedWord} 
          pickedCategory={pickedCategory} 
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetter={wrongLetter}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
