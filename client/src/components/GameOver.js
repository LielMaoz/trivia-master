import React, { useContext, useEffect } from 'react';
import { LoginContext } from '../context/Context';
import axios from 'axios';

const GameOver = ({ score, strikes, restartGame }) => {
  const { userLoggedIn } = useContext(LoginContext);

  const handleScore = async () => {
    if (userLoggedIn) {
      try {
        const response = await axios.post('http://localhost:5000/api/score', {
          email: userLoggedIn.email,
          score,
        });
        if (response.data.success) {
          console.log('handle score for user: ', userLoggedIn.email);
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error('Error registering user:', error);
        alert('An error occurred during registration.');
      }
    }
  };

  useEffect(() => {
    handleScore();
  }, []);

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
