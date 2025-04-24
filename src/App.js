import React, { useState } from "react";

const questions = Array.from({ length: 90 }, (_, i) => {
  const categories = ["Grammar", "Revision", "Research", "Rhetorical"];
  const category = i < 10 ? categories[0] :
                   i < 46 ? categories[1] :
                   i < 68 ? categories[2] : categories[3];

  return {
    question: `Q${i + 1} (${category}): Choose the best revision or correction.`,
    options: [
      `A: Clear and grammatically correct for Q${i + 1}`,
      `B: Ambiguous or incomplete answer for Q${i + 1}`,
      `C: Incorrect syntax or unclear reference in Q${i + 1}`,
      `D: Verbose or improperly cited version of Q${i + 1}`
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
