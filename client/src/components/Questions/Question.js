import React, { useState, useEffect } from 'react';

const Question = () => {
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

    const questionDatabase = [
        {
            question: "What is the capital of France?",
            correctAnswer: "Paris",
            answers: ["London", "Berlin", "Paris", "Rome"],
        },
        {
            question: "What is the capital of Germany?",
            correctAnswer: "Berlin",
            answers: ["London", "Berlin", "Paris", "Rome"],
        },
    ];

    useEffect(() => {
        setQuestions(questionDatabase);
    }, []);

    const handleAnswerClick = (selectedAnswer) => {
        const correctAnswer = questions[currentQuestionIndex].correctAnswer;
        if (selectedAnswer === correctAnswer) {
            setScore(score + 1);
            setIsAnswerCorrect(true);
        } else {
            setIsAnswerCorrect(false);
        }
    };

    const nextQuestion = () => {
        setIsAnswerCorrect(null);
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
    };

    if (questions.length === 0) {
        return <div>Loading questions...</div>;
    }

    return (
        <div>
            <h2>Question {currentQuestionIndex + 1}:</h2>
            <h3>{questions[currentQuestionIndex].question}</h3>
            <div>
                {questions[currentQuestionIndex].answers.map((answer, index) => (
                    <button key={index} onClick={() => handleAnswerClick(answer)}>
                        {answer}
                    </button>
                ))}
            </div>
            {isAnswerCorrect === true && <p>Correct! 🎉</p>}
            {isAnswerCorrect === false && <p>Wrong! 😢</p>}
            <h3>Score: {score}</h3>
            <button onClick={nextQuestion}>Next Question</button>
        </div>
    );
};

export default Question;
