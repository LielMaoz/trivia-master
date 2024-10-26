import React, { useContext } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import './Login/form.css';
import { GameContext } from '../context/Context';

const Custom = () => {
  console.log('custom component is rendering');
  const navigate = useNavigate();

  const { gameOptions, setGameOptions } = useContext(GameContext);
  const { numOfQuestions, category, difficulty } = gameOptions;

  const categoryOptions = [
    { value: '9', label: 'General Knowledge' },
    { value: '21', label: 'Sports' },
    { value: '23', label: 'History' },
    { value: '24', label: 'Politics' },
  ];

  const difficultyOptions = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ];

  const handleCustomGame = () => {
    // Navigate to the question board with query parameters
    navigate(`/Question/Question`);
  };

  return (
    <div>
      {/*<h1>Welcome to the Trivia Game!</h1>*/}

      <h1>Custom Game</h1>
      <div className='left-align'>
        <label>
          Number of Questions:
          <input
            className='input-field'
            type='number'
            value={numOfQuestions}
            onChange={(e) => {
              const inputValue = Number(e.target.value);
              if (inputValue >= 5 && inputValue <= 500) {
                //allow values within the range
                setGameOptions((prevOptions) => ({
                  ...prevOptions,
                  numOfQuestions: inputValue,
                }));
              }
            }}
          />
        </label>
        <br></br>
        <label>
          <br></br>
          Category:
          <Select
            className='select-field'
            options={categoryOptions}
            value={categoryOptions.find((option) => option.value === category)}
            onChange={(SelectedOption) =>
              setGameOptions((prevOptions) => ({
                ...prevOptions,
                category: SelectedOption.value,
              }))
            }
          />
        </label>
        <br></br>
        <label>
          Difficulty:
          <Select
            className='select-field'
            options={difficultyOptions}
            value={difficultyOptions.find(
              (option) => option.value === difficulty
            )}
            onChange={(SelectedOption) =>
              setGameOptions((prevOptions) => ({
                ...prevOptions,
                difficulty: SelectedOption.value,
              }))
            }
          />
        </label>
        <br></br>
        <br></br>
      </div>
      <button onClick={handleCustomGame}>Start Custom Game</button>
    </div>
  );
};

export default Custom;
