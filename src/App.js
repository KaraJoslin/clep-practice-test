
import React, { useState, useEffect } from 'react';

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
  // Add more questions up to 90 in the same format
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [startTime, setStartTime] = useState(Date.now());
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
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsComplete(true);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setIsComplete(false);
    setSelectedAnswers({});
    setStartTime(Date.now());
    setTimeLeft(60 * 90);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return \`\${mins.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`;
  };

  if (isComplete) {
    return (
      <div>
        <h1>Test Complete</h1>
        <p>Your score: {score} / {questions.length}</p>
        <ul>
          {questions.map((q) => (
            <li key={q.id}>
              <strong>{q.question}</strong><br />
              Correct Answer: {q.correctAnswer}<br />
              Your Answer: {selectedAnswers[q.id]}
            </li>
          ))}
        </ul>
        <button onClick={handleRestart}>Start Over</button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div>
      <h1>Question {currentQuestion + 1} of {questions.length}</h1>
      <p>{question.question}</p>
      {question.options.map((opt, index) => (
        <button key={index} onClick={() => handleAnswer(opt)}>{opt}</button>
      ))}
      <p>Time Left: {formatTime(timeLeft)}</p>
    </div>
  );
}

export default App;
