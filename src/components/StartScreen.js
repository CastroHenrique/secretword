import './StartScreen.css';

const StartScreen = ({startGame}) => {
  return (
    <div className="start">
        <h1>Screct Word</h1>
        <p>Click the button below to start playing</p>
        <button onClick={startGame}>Start the game</button>
    </div>
  )
}

export default StartScreen