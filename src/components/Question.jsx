import { useMemo } from "react";
import { useTrivia } from "../contexts/TriviaContext";

import QuestionHeader from "./QuestionHeader";
import QuestionOptions from "./QuestionOptions";

function Question() {
  const { questions, index } = useTrivia();
  const {
    category,
    difficulty,
    question,
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers,
  } = questions.at(index);

  const answers = useMemo(
    () => [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5),
    [incorrectAnswers, correctAnswer]
  );

  return (
    <div className="question-container">
      <QuestionHeader difficulty={difficulty} category={category} />

      <h4
        className="question-title"
        dangerouslySetInnerHTML={{ __html: question }}
      />

      <QuestionOptions answers={answers} correctAnswer={correctAnswer} />
    </div>
  );
}

export default Question;
