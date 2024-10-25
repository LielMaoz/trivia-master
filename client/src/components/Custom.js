import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import './Login/form.css';

const Custom = () => {
  console.log('custom component is rendering');
  const navigate = useNavigate();
  const [numOfQuestions, setnumOfQuestions] = useState(10);
  const [category, setCategory] = useState({
    value: '9',
    label: 'General Knowledge',
  });
  const [difficulty, setDifficulty] = useState({
    value: 'medium',
    label: 'Medium',
  });

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
    navigate(
      `/Question/Question?numOfQuestions=${numOfQuestions}&category=${category.value}&difficulty=${difficulty.value}`
    );
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
                setnumOfQuestions(inputValue);
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
            value={category}
            onChange={setCategory}
          />
        </label>
        <br></br>
        <label>
          Difficulty:
          <Select
            className='select-field'
            options={difficultyOptions}
            value={difficulty}
            onChange={setDifficulty}
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
