import React, { useState, useEffect } from "react";

const TOTAL_TIME = 95 * 60;
const LOCAL_HISTORY_KEY = "clep_score_history";

const questions = Array.from({ length: 90 }, (_, i) => {
  const category = i < 10 ? "Grammar" : i < 46 ? "Revision" : i < 68 ? "Research" : "Rhetorical";
  return {
    question: `Q${i + 1} (${category}): Choose the best revision or correction.`,
    options: [
      `A: Clear and correct version for Q${i + 1}`,
      `B: Ambiguous or incomplete option for Q${i + 1}`,
      `C: Incorrect or unclear choice for Q${i + 1}`,
      `D: Verbose or improperly formatted version for Q${i + 1}`
    ],
    answer: 0
  };
});

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return \`\${m}:\${s.toString().padStart(2, '0')}\`;
}

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [timerActive, setTimerActive] = useState(true);
  const [history, setHistory] = useState(() => {
    const stored = localStorage.getItem(LOCAL_HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
    if (timeLeft === 0 && !submitted) {
      handleSubmit();
    }
  }, [timerActive, timeLeft, submitted]);

  const handleAnswer = (index) => {
    const updated = [...answers];
    updated[currentQuestion] = index;
    setAnswers(updated);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const score = answers.reduce((total, a, i) => (a === questions[i].answer ? total + 1 : total), 0);
    const session = {
      date: new Date().toLocaleString(),
      score,
      outOf: questions.length,
      timeRemaining: formatTime(timeLeft)
    };
    const updatedHistory = [session, ...history.slice(0, 4)];
    localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
    setSubmitted(true);
    setTimerActive(false);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSubmitted(false);
    setTimeLeft(TOTAL_TIME);
    setTimerActive(true);
  };

  if (submitted) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Test Complete</h1>
        <p>Your score: {answers.filter((a, i) => a === questions[i].answer).length} / {questions.length}</p>
        <p>Time Remaining: {formatTime(timeLeft)}</p>
        <button onClick={handleRestart}>Start Over</button>
        <h2>Score History</h2>
        <ul>
          {history.map((h, i) => (
            <li key={i}>
              {h.date} — Score: {h.score}/{h.outOf}, Time Left: {h.timeRemaining}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Question {currentQuestion + 1} of {questions.length}</h1>
        <h2>Time: {formatTime(timeLeft)}</h2>
      </div>
      <p>{questions[currentQuestion].question}</p>
      {questions[currentQuestion].options.map((option, i) => (
        <button key={i} onClick={() => handleAnswer(i)} style={{ display: "block", margin: "10px 0" }}>
          {option}
        </button>
      ))}
    </div>
  );
}