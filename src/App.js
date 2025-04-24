import React, { useState, useEffect } from "react";

const questions = [
  {
    id: 1,
    question: "Q1 (Grammar): Choose the best revision or correction.",
    options: [
      "A: Clear and grammatically correct for Q1",
      "B: Ambiguous or incomplete answer for Q1",
      "C: Incorrect syntax or unclear reference in Q1",
      "D: Verbose or improperly cited version of Q1"
    ],
    correctAnswer: "A: Clear and grammatically correct for Q1"
  }
  // Add more questions here (up to 90)...
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [startTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(60 * 90); // 90 minutes

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

  const restartTest = () => {
    setCurrentQuestion(0);
    setScore(0);
    setIsComplete(false);
    setSelectedAnswers({});
    setTimeLeft(60 * 90);
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  if (isComplete) {
    return (
      <div>
        <h2>Test Complete!</h2>
        <p>Your score: {score} out of {questions.length}</p>
        <button onClick={restartTest}>Restart Test</button>
      </div>
    );
  }

  const current = questions[currentQuestion];

  return (
    <div>
      <h2>Question {currentQuestion + 1} of {questions.length}</h2>
      <p>{current.question}</p>
      <ul>
        {current.options.map((opt, idx) => (
          <li key={idx}>
            <button onClick={() => handleAnswer(opt)}>{opt}</button>
          </li>
        ))}
      </ul>
      <p>Time Left: {formatTime(timeLeft)}</p>
    </div>
  );
}

export default App;