import React, { useState, useEffect } from 'react';

// Mock function simulating API fetch
const fetchQuestions = async () => {
  const questions = [
    {
      id: 1,
      question: "Which sentence uses correct subject-verb agreement?",
      options: [
        "The group of students are meeting after class.",
        "The group of students is meeting after class.",
        "The groups of students is meeting after class.",
        "The group of students were meeting after class."
      ],
      correctAnswer: "The group of students is meeting after class."
    },
    // Add additional hardcoded CLEP-style questions here, total up to 90
  ];
  return questions.sort(() => 0.5 - Math.random()); // Randomize
};

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(90 * 60); // 90 minutes in seconds
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      const fetched = await fetchQuestions();
      setQuestions(fetched);
    };
    loadQuestions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswer = (selected) => {
    if (!finished) {
      if (selected === questions[currentIndex].correctAnswer) {
        setScore((prev) => prev + 1);
      }
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setFinished(true);
      }
    }
  };

  const restartTest = () => {
    window.location.reload();
  };

  if (questions.length === 0) return <div>Loading Questions...</div>;

  if (finished) {
    const percentage = ((score / questions.length) * 100).toFixed(1);
    return (
      <div>
        <h1>Test Complete!</h1>
        <p>Your Score: {score} out of {questions.length}</p>
        <p>Percentage: {percentage}%</p>
        <button onClick={restartTest}>Restart Test</button>
      </div>
    );
  }

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div>
      <h1>Question {currentIndex + 1} of {questions.length}</h1>
      <p>{questions[currentIndex].question}</p>
      {questions[currentIndex].options.map((option, idx) => (
        <button key={idx} onClick={() => handleAnswer(option)}>{option}</button>
      ))}
      <div>
        <p>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
      </div>
    </div>
  );
}

export default App;