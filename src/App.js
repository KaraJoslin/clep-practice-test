
import React, { useState, useEffect } from 'react';

const questions = Array.from({ length: 90 }, (_, i) => ({
  id: i + 1,
  question: `Q${i + 1}: Sample question ${i + 1}?`,
  options: [
    'Option A',
    'Option B',
    'Option C',
    'Option D'
  ],
  correctAnswer: 'Option A'
}));

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [startTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(60 * 90);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (option) => {
    const question = questions[currentQuestion];
    setSelectedAnswers(prev => ({ ...prev, [question.id]: option }));

    if (option === question.correctAnswer) {
      setScore(prev => prev + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsComplete(true);
  };

  if (isComplete) {
    return (
      <div>
        <h2>Test Completed</h2>
        <p>Your score: {score} / {questions.length}</p>
        <p>Time Taken: {Math.round((Date.now() - startTime) / 1000)} seconds</p>
      </div>
    );
  }

  const current = questions[currentQuestion];

  return (
    <div>
      <h2>Question {currentQuestion + 1} of {questions.length}</h2>
      <p>{current.question}</p>
      {current.options.map((opt, i) => (
        <button key={i} onClick={() => handleAnswer(opt)}>{opt}</button>
      ))}
      <p>Time Left: {timeLeft}s</p>
    </div>
  );
}

export default App;
