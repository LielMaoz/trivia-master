import React, { useState, useEffect } from 'react';
import questionsBank from './QuestionBank';   //!!!!!!
import Timer from '../Timer';
let nextQVis = false; 
const seconds = 5;  //should be 30

const Question = () => {
    const [score, setScore] = useState(0);
    const [strikes, setStirkes] = useState(3);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);


    const [count, setCount] = useState(seconds); 
    const [hasTimedOut, setHasTimedOut] = useState(false); // To prevent multiple timeouts
    const [timeRun, setTimeRun] = useState(true); // to prevent the time from running
   
    
    useEffect(() => {
        setQuestions(questionsBank);
    }, []);

    const handleAnswerClick = (selectedAnswer) => { 
        setTimeRun(false);  // stop the timer
        if (!nextQVis) {    // if it is the first time the user choose an answer for the question
            nextQVis = true;
            const correctAnswer = questions[currentQuestionIndex].correctAnswer;
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
            setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length); // when there are no more questions go back to the beginning
        }        
    };

    const restartGame = () => {
        setScore(0);
        setStirkes(3);
        setCurrentQuestionIndex(0);
        setIsAnswerCorrect(null);
        setTimeRun(true);
        setHasTimedOut(false);
        nextQVis = false;
        setCount(seconds);
    }

    if (questions.length === 0) {  
        return <div>Loading questions...</div>;
    }

    const timeOut = () => {
        nextQVis = true; 
        setStirkes(strikes - 1); 
        setIsAnswerCorrect(false);
        
    };

   /*  **** <button onClick={something-to-exit}>not now</button> - if you want the user to have a choice */ 
    if (strikes === 0) {
        return (
            <div>
                <img src="/images/gameOver.png"  width="300" height="100" alt="Game Over" />
                <h3> Your score is: {score} </h3>
                <div> 
                    {score > 1 ? <p> good game!</p> : <p> better luck next time...</p>}
                </div>
                <h4> Do you want to play again? </h4>
                <button onClick={restartGame}>Yes!</button>
            </div>
        );
    }

/* <Timer onTimeOut={timeOut}/>  -> the timeout function is a prop */
    else {
        return (
            <div>
                <h3>Score: {score} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Strikes: {strikes} </h3>
                
                <Timer count={count} setCount={setCount} onTimeOut={timeOut}
                    hasTimeOut={hasTimedOut} setHasTimedOut={setHasTimedOut} timeRun={timeRun} setTimeRun={setTimeRun} />
                
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
                {isAnswerCorrect === false && (hasTimedOut? <p> Time's up! 🐢</p> : <p>Wrong! 😢</p>)}
                {nextQVis === true && <button onClick={nextQuestion}>Next Question</button>}
                
            </div>
        );
    }    
};



export default Question;
