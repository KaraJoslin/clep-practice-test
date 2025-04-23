import React, { useState } from "react";

const generateQuestions = () => {
  const categories = ["Grammar", "Revision", "Research", "Rhetorical"];
  const questions = [];
  for (let i = 0; i < 90; i++) {
    questions.push({
      question: `Question ${i + 1}: This is a sample question from ${categories[i % 4]}.`,
      options: [
        `Option A for Q${i + 1}`,
        `Option B for Q${i + 1}`,
        `Option C for Q${i + 1}`,
        `Option D for Q${i + 1}`
      ],
      answer: Math.floor(Math.random() * 4)
    });
  }
  return questions;
};

const questions = generateQuestions();

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
