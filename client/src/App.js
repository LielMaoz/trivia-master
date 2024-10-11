import React from 'react';
import Question from './components/Questions/Question'; // Ensure you have TriviaGame in the same folder
import './App.css';

const App = () => {
    return (
      <div id="background-div">
        <div className="content-container">
            <img src="/images/triviaMasterHeader3.png"  width="87%" height="34%" alt="trivia master" />
            <div className="question-component">
                <Question />
            </div>
          </div>

        </div>
    );
};

export default App;
