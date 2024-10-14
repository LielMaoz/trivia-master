import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  console.log('HomeScreen component is rendering');
  const navigate = useNavigate();
  const [numQuestions, setNumQuestions] = useState(10);
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
      `/questions?numQuestions=${numQuestions}&category=${category.value}&difficulty=${difficulty.value}`
    );
  };

  return (
    <div>
      <h1>Welcome to the Trivia Game!</h1>

      <h2>Custom Game</h2>

      <label>
        Number of Questions:
        <input
          type='number'
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          min='1'
          max='50'
        />
      </label>

      {/* Category Dropdown */}
      <label>
        <br></br>
        Category:
        <Select
          options={categoryOptions}
          value={category}
          onChange={setCategory}
        />
      </label>

      {/* Difficulty Dropdown */}
      <label>
        Difficulty:
        <Select
          options={difficultyOptions}
          value={difficulty}
          onChange={setDifficulty}
        />
      </label>

      <button onClick={handleCustomGame}>Start Custom Game</button>
    </div>
  );
};

export default HomeScreen;
