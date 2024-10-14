import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Timer from './Timer';
let nextQVis = false;
const seconds = 30;

const Question = () => {
  const [score, setScore] = useState(0);
  const [strikes, setStirkes] = useState(3);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [loading, setLoading] = useState(true);

  const [count, setCount] = useState(seconds);
  const [hasTimedOut, setHasTimedOut] = useState(false); // To prevent multiple timeouts
  const [timeRun, setTimeRun] = useState(true); // to prevent the time from running

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          'https://opentdb.com/api.php?amount=100&category=9&type=multiple'
        );

        // **Process the questions to add shuffled answers**
        const fetchedQuestions = response.data.results.map((question) => {
          const options = shuffleAnswers([
            ...question.incorrect_answers,
            question.correct_answer,
          ]);
          return { ...question, options }; // **Added shuffled options to the question object**
        });
        setQuestions(fetchedQuestions); // **Store questions in state**
        setLoading(false); // **Set loading to false when done**
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchQuestions();
  }, []);

  // **Shuffle function to randomize answer order**
  const shuffleAnswers = (answers) => {
    return answers.sort(() => Math.random() - 0.5);
  };

  if (loading) return <div>Loading...</div>; // **Display loading message while fetching**

  const handleAnswerClick = (selectedAnswer) => {
    setTimeRun(false); // stop the timer
    if (!nextQVis) {
      // if it is the first time the user choose an answer for the question
      nextQVis = true;
      const correctAnswer = questions[currentQuestionIndex].correct_answer;
      if (selectedAnswer === correctAnswer) {
        setScore(score + 1);
        setIsAnswerCorrect(true);
      } else {
        setIsAnswerCorrect(false);
        setStirkes(strikes - 1);
      }
    }
  };

  const nextQuestion = () => {
    if (strikes > 0) {
      setHasTimedOut(false);
      setTimeRun(true);
      setCount(seconds);
      nextQVis = false;
      setIsAnswerCorrect(null);
      setCurrentQuestionIndex(
        (prevIndex) => (prevIndex + 1) % questions.length
      ); // when there are no more questions go back to the beginning
    }
  };

  const restartGame = () => {
    setScore(0);
    setStirkes(3);
    //setCurrentQuestionIndex(0);
    setIsAnswerCorrect(null);
    setTimeRun(true);
    setHasTimedOut(false);
    nextQVis = false;
    setCount(seconds);
    setCurrentQuestionIndex(0);
  };

  const timeOut = () => {
    nextQVis = true;
    setStirkes(strikes - 1);
    setIsAnswerCorrect(false);
  };

  /*  **** <button onClick={something-to-exit}>not now</button> - if you want the user to have a choice */
  if (strikes === 0) {
    return (
      <div>
        <img
          src='/images/gameOver.png'
          width='300'
          height='100'
          alt='Game Over'
        />
        <h3> Your score is: {score} </h3>
        <div>
          {score > 1 ? <p> good game!</p> : <p> better luck next time...</p>}
        </div>
        <h4> Do you want to play again? </h4>
        <button onClick={restartGame}>Yes!</button>
      </div>
    );
  } else {
    /* <Timer onTimeOut={timeOut}/>  -> the timeout function is a prop */
    return (
      <div>
        <h3>
          Score: {score} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Strikes: {strikes}{' '}
        </h3>

        <Timer
          count={count}
          setCount={setCount}
          onTimeOut={timeOut}
          hasTimeOut={hasTimedOut}
          setHasTimedOut={setHasTimedOut}
          timeRun={timeRun}
          setTimeRun={setTimeRun}
        />

        <h2>Question {currentQuestionIndex + 1}:</h2>
        <h3>{questions[currentQuestionIndex].question}</h3>
        <div>
          {questions[currentQuestionIndex].options.map((answer, index) => (
            <button key={index} onClick={() => handleAnswerClick(answer)}>
              {answer}
            </button>
          ))}
        </div>
        {isAnswerCorrect === true && <p>Correct! 🎉</p>}
        {isAnswerCorrect === false &&
          (hasTimedOut ? <p> Time's up! 🐢</p> : <p>Wrong! 😢</p>)}
        {nextQVis === true && (
          <button onClick={nextQuestion}>Next Question</button>
        )}
      </div>
    );
  }
};

export default Question;
