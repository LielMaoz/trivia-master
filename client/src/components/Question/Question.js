import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Timer from '../Timer';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Question.css';
import he from 'he'; // Import the 'he' library

const Question = () => {
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

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const numQuestions = searchParams.get('numQuestions');
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');

    const [questionsSolved, setQuestionsSolved] = useState(0); //**solved = with a correct/wrong answer or a timeout

    // Move fetchQuestions outside the useEffect - in order to use it in the restart function
    const fetchQuestions = async () => {
        try {
            const response = await axios.get(
                `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
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
    }, [numQuestions, category, difficulty]);

    // **Shuffle function to randomize answer order**
    /*const shuffleAnswers = (answers) => {
        return answers.sort(() => Math.random() - 0.5);
    };*/
    const shuffleAnswers = (answers) => {
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Swap elements at index i and j
            [answers[i], answers[j]] = [answers[j], answers[i]];
            /* let temp = answers[i];
            answers[i] = answers[j];
            answers[j] = temp;*/
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
    if (questionsSolved == numQuestions && strikes != 0) {
        return (
            <div>
                <div className='links-bar'>
                    <Link to='/HomeScreen'>Home screen</Link>
                </div>
                <img
                    src='/images/finish.png'
                    width='80%'
                    height='30%'
                    alt='Finish'
                />
                <h2> Your score is: {score} 🏆</h2>
                <h3> Do you want to play again? </h3>
                <button onClick={restartGame}>Yes!</button>
            </div>
        );
    } else {
        if (strikes === 0) {
            return (
                <div>
                    <div className='links-bar'>
                        <Link to='/HomeScreen'>Home screen</Link>
                    </div>
                    <img
                        src='/images/gameOver1.png'
                        width='70%'
                        height='25%'
                        alt='Game Over'
                    />
                    <h3> Your score is: {score} </h3>
                    <div>
                        {score > 1 ? (
                            <p> good game!</p>
                        ) : (
                            <p> better luck next time...</p>
                        )}
                    </div>
                    <h4> Do you want to play again? </h4>
                    <button onClick={restartGame}>Yes!</button>
                </div>
            );
        } else {
            /* <Timer onTimeOut={timeOut}/>  -> the timeout function is a prop  */
            return (
                <div>
                    <div className='links-bar'>
                        <Link to='/HomeScreen'>Home screen</Link>
                        <Link to='/'>Login screen</Link>
                    </div>
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

                    <h2>Question {currentQuestionIndex + 1}:</h2>
                    <h3>{questions[currentQuestionIndex].question}</h3>
                    <div>
                        {questions[currentQuestionIndex].options.map(
                            (answer, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerClick(answer)}
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
                                    Wrong! 😢 <br></br> The correct answer is{' '}
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
                </div>
            );
        }
    }
};

export default Question;
