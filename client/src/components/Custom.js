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
        /*{ value: '16', label: 'Board Games' },*/
        { value: '17', label: 'Science & Nature' },
        { value: '18', label: 'Science: Computers' },
        /*{ value: '19', label: 'Science: Mathematics' },*/
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
        <div className='wrapper'>
            <h1>Custom Game</h1>
            <div className='left-align'>
                <label>Number of Questions: </label>
                <input
                    className='input-field2'
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
                <br></br>
                <br></br>
                <label>
                    <br></br>
                    Category:{' '}
                </label>
                <Select
                    className='select-field'
                    options={categoryOptions}
                    value={categoryOptions.find(
                        (option) => option.value === category
                    )}
                    onChange={(SelectedOption) =>
                        setGameOptions((prevOptions) => ({
                            ...prevOptions,
                            category: SelectedOption.value,
                        }))
                    }
                />
                <br></br>
                <br></br>
                <label>Difficulty: </label>
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

                <br></br>
                <br></br>
            </div>
            <button onClick={handleCustomGame}>Start Custom Game</button>
        </div>
    );
};

export default Custom;
