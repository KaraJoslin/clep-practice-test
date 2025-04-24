import React, { useState } from "react";

const questions = Array.from({ length: 90 }, (_, i) => {
  const category = i < 10
    ? "Grammar"
    : i < 46
    ? "Revision"
    : i < 68
    ? "Research"
    : "Rhetorical";

  return {
    question: `Q${i + 1} (${category}): What is the most appropriate correction for this sentence?`,
    options: [
      `Option A: A grammatically sound alternative for Q${i + 1}`,
      `Option B: Another rewrite option for Q${i + 1}`,
      `Option C: A wordy or incorrect option for Q${i + 1}`,
      `Option D: A poorly punctuated or illogical phrase for Q${i + 1}`
    ],
    answer: 0
  };
});

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (index) => {
    const updated = [...answers];
    updated[currentQuestion] = index;
    setAnswers(updated);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setSubmitted(true);
    }
  };

  const score = answers.reduce(
    (total, a, i) => (a === questions[i].answer ? total + 1 : total),
    0
  );

  if (submitted) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Test Complete</h1>
        <p>Your score: {score} / {questions.length}</p>
        <ul>
          {questions.map((q, i) => (
            <li key={i}>
              <strong>{q.question}</strong><br />
              Correct Answer: {q.options[q.answer]}<br />
              Your Answer: {q.options[answers[i]]}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Question {currentQuestion + 1} of {questions.length}</h1>
      <p>{questions[currentQuestion].question}</p>
      {questions[currentQuestion].options.map((option, i) => (
        <button
          key={i}
          onClick={() => handleAnswer(i)}
          style={{ display: "block", margin: "10px 0" }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
