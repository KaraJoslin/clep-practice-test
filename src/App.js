import React, { useState, useEffect } from 'react'; // Triggering GitHub change detection
// updated

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
  },
  // Add more questions up to 90 in the same format
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
    const scoreHistory = JSON.parse(localStorage.getItem('scoreHistory') || '[]');
    scoreHistory.push({ date: new Date().toISOString(), score });
    localStorage.setItem('scoreHistory', JSON.stringify(scoreHistory));
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setIsComplete(false);
    setSelectedAnswers({});
    setTimeLeft(60 * 90);
  };

  if (isComplete) {
    return (
      <div>
        <h2>Test Complete</h2>
        <p>Your score: {score} / {questions.length}</p>
        <ul>
          {questions.map(q => (
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

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <h2>Question {currentQuestion + 1} of {questions.length}</h2>
      <p>{questions[currentQuestion].question}</p>
      {questions[currentQuestion].options.map(option => (
        <button key={option} onClick={() => handleAnswer(option)}>{option}</button>
      ))}
      <p>Time Left: {minutes}:{seconds.toString().padStart(2, '0')}</p>
    </div>
  );
}

export default App;