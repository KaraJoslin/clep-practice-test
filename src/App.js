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
  },
  {
    question: "Which source would be the most credible for a research paper on climate change?",
    options: [
      "A personal blog by a college student",
      "An editorial in a fashion magazine",
      "A peer-reviewed journal article by climate scientists",
      "A social media post from a politician"
    ],
    answer: 2
  },
  {
    question: "In rhetorical writing, what is 'ethos'?",
    options: [
      "An emotional appeal",
      "An ethical or credibility-based appeal",
      "A logical appeal",
      "A stylistic device"
    ],
    answer: 1
  }
];

export default function CLEPPracticeTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswer = (optionIndex) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = optionIndex;
    setUserAnswers(updatedAnswers);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const score = userAnswers.reduce((acc, curr, index) => {
    return curr === questions[index].answer ? acc + 1 : acc;
  }, 0);

  return (
    <div className="max-w-xl mx-auto p-4">
      {!isSubmitted ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <p className="mb-4">{questions[currentQuestion].question}</p>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="block w-full text-left px-4 py-2 border rounded hover:bg-gray-100"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4">Exam Completed</h2>
          <p className="mb-2">Your Score: {score} / {questions.length}</p>
          <ul className="list-disc ml-5 space-y-1">
            {questions.map((q, i) => (
              <li key={i}>
                <strong>Q{i + 1}:</strong> {q.question}<br />
                <span className="text-green-600">Correct Answer:</span> {q.options[q.answer]}<br />
                <span className={
                  userAnswers[i] === q.answer ? "text-green-600" : "text-red-600"
                }>
                  Your Answer: {q.options[userAnswers[i]]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
