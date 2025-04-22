import React, { useState } from "react";

const questions = [
  {
    question: "Which of the following sentences is grammatically correct?",
    options: [
      "Him and I went to the store.",
      "He and I went to the store.",
      "He and me went to the store.",
      "Me and him went to the store."
    ],
    answer: 1
  },
  {
    question: "What is the main purpose of a thesis statement in an essay?",
    options: [
      "To summarize the essay's conclusion",
      "To list all the arguments",
      "To state the main idea or argument",
      "To provide background information"
    ],
    answer: 2
  }
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (i) => {
    const updated = [...answers];
    updated[currentQuestion] = i;
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
      <h1>Question {currentQuestion + 1}</h1>
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
