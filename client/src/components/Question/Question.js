import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import Timer from '../Timer';
import GameOver from '../GameOver';

import './Question.css';
import he from 'he'; // Import the 'he' library
import { GameContext } from '../../context/Context';

const Question = () => {
    const { gameOptions } = useContext(GameContext);
    const { numOfQuestions, category, difficulty } = gameOptions;

    const seconds = 30;

    const [score, setScore] = useState(0);
    const [strikes, setStrikes] = useState(3);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [loading, setLoading] = useState(true);
    const [nextQVis, setNextQVis] = useState(false); //changes the visibility of the next question button

    const [count, setCount] = useState(seconds);
    const [hasTimedOut, setHasTimedOut] = useState(false); // To prevent multiple timeouts
    const [timeRun, setTimeRun] = useState(true); // to prevent the time from running

    const [questionsSolved, setQuestionsSolved] = useState(0); //**solved = with a correct/wrong answer or a timeout

    // Move fetchQuestions outside the useEffect - in order to use it in the restart function
    const fetchQuestions = async () => {
        try {
            const response = await axios.get(
                `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
            );

            const fetchedQuestions = response.data.results.map((question) => {
                const decodedQuestion = he.decode(question.question);
                const decodedCorrectAnswer = he.decode(question.correct_answer);
                const decodedIncorrectAnswers = question.incorrect_answers.map(
                    (answer) => he.decode(answer)
                );

                const options = shuffleAnswers([
                    ...decodedIncorrectAnswers,
                    decodedCorrectAnswer,
                ]);

                return {
                    ...question,
                    question: decodedQuestion,
                    correct_answer: decodedCorrectAnswer,
                    options,
                };
            });

            setQuestions(fetchedQuestions);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [numOfQuestions, category, difficulty]);

    const shuffleAnswers = (answers) => {
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Swap elements at index i and j
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        return answers;
    };

    if (loading) return <div>Loading...</div>; // **Display loading message while fetching**

    const handleAnswerClick = (selectedAnswer) => {
        setTimeRun(false); // stop the timer
        if (!nextQVis) {
            // if it is the first time the user choose an answer for the question
            setNextQVis(true);
            const correctAnswer =
                questions[currentQuestionIndex].correct_answer;
            if (selectedAnswer === correctAnswer) {
                setScore(score + 1);
                setIsAnswerCorrect(true);
            } else {
                setIsAnswerCorrect(false);
                setStrikes(strikes - 1);
            }
            setQuestionsSolved(questionsSolved + 1);
        }
    };

    const nextQuestion = () => {
        if (strikes > 0) {
            setHasTimedOut(false);
            setTimeRun(true);
            setCount(seconds);
            setNextQVis(false);
            setIsAnswerCorrect(null);
            setCurrentQuestionIndex(
                (prevIndex) => (prevIndex + 1) % questions.length
            ); // when there are no more questions go back to the beginning
        }
    };

    const restartGame = async () => {
        setScore(0);
        setStrikes(3);
        setIsAnswerCorrect(null);
        setTimeRun(true);
        setHasTimedOut(false);
        setNextQVis(false);
        setCount(seconds);
        setCurrentQuestionIndex(0);
        setQuestionsSolved(0);

        setLoading(true);
        await fetchQuestions(); //fetch new questions
        setLoading(false);
    };

    const timeOut = () => {
        setNextQVis(true);
        setStrikes(strikes - 1);
        setIsAnswerCorrect(false);
        setQuestionsSolved(questionsSolved + 1);
    };

    /*  **** <button onClick={something-to-exit}>not now</button> - if you want the user to have a choice */

    /*three situations - game over -the user won - no more questions and there is more then 1 strike
                       - game over - the user lost - no more strikes
                       - there are more questions and strikes - show a button to mave to the next one */
    if (questionsSolved == numOfQuestions || strikes === 0) {
        return (
            <GameOver
                score={score}
                strikes={strikes}
                restartGame={restartGame}
            />
        );
    } else {
        /* <Timer onTimeOut={timeOut}/>  -> the timeout function is a prop  */
        return (
            <div className='questionWrapper'>
                <div className='infoBar'>
                    <span className='info'> Score: {score}</span>
                    <span className='info'>
                        {' '}
                        Strikes:
                        {strikes}{' '}
                    </span>
                    <Timer
                        count={count}
                        setCount={setCount}
                        onTimeOut={timeOut}
                        hasTimeOut={hasTimedOut}
                        setHasTimedOut={setHasTimedOut}
                        timeRun={timeRun}
                        setTimeRun={setTimeRun}
                    />
                </div>

                {/* Check if questions array is populated and currentQuestionIndex is valid */}
                {questions.length > 0 && questions[currentQuestionIndex] ? (
                    <>
                        <h2>Question {currentQuestionIndex + 1}:</h2>
                        <h3>{questions[currentQuestionIndex].question}</h3>
                        <div className='answersWrapper'>
                            {questions[currentQuestionIndex].options.map(
                                (answer, index) => (
                                    <button
                                        className='answerbutton'
                                        key={index}
                                        onClick={() =>
                                            handleAnswerClick(answer)
                                        }
                                    >
                                        {answer}
                                    </button>
                                )
                            )}
                        </div>
                        <div>
                            {isAnswerCorrect === true && <p>Correct! 🎉</p>}
                            {isAnswerCorrect === false &&
                                (hasTimedOut ? (
                                    <p> Time's up! 🐢</p>
                                ) : (
                                    <p>
                                        Wrong! 😢 <br></br> The correct answer
                                        is{' '}
                                        {
                                            questions[currentQuestionIndex]
                                                .correct_answer
                                        }
                                    </p>
                                ))}
                            {nextQVis === true && (
                                <button onClick={nextQuestion}>
                                    Next Question
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <div>Loading question...</div> // until questions are loaded
                )}
            </div>
        );
    }
};

export default Question;
