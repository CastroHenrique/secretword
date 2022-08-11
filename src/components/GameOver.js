import './GameOver.css';

const GameOver = ({retry, score}) => {
  return (
    <div>
      <h1>GameOver</h1>
      <h2>Your score was: <span>{score}</span></h2>
      <button onClick={retry}>Reset Game</button>
    </div>
  )
}

export default GameOver