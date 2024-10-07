import React from 'react';
import Question from './components/Questions/Question'; // Ensure you have TriviaGame in the same folder
import './App.css';

const App = () => {
    return (
      <div id="background-div">
         <div className="content-container">
            <h1>Trivia Master</h1>
            <div className="question-component">
                <Question />
            </div>
          </div>

        </div>
    );
};

export default App;
