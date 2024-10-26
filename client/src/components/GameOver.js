import React from 'react';

const GameOver = ({ score, strikes, restartGame }) => {
  if (strikes != 0) {
    return (
      <div>
        <img src='../images/finish.png' width='80%' height='30%' alt='Finish' />
        <h2> Your score is: {score} 🏆</h2>
        <h3> Do you want to play again? </h3>
        <button onClick={() => restartGame()}>Yes!</button>
      </div>
    );
  } else {
    return (
      <div>
        <img
          src='../images/gameOver1.png'
          width='70%'
          height='25%'
          alt='Game Over'
        />
        <h3> Your score is: {score} </h3>
        <div>
          {score > 1 ? <p> good game!</p> : <p> better luck next time...</p>}
        </div>
        <h4> Do you want to play again? </h4>
        <button onClick={() => restartGame()}>Yes!</button>
      </div>
    );
  }
};

export default GameOver;
