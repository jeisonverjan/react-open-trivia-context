import { useTrivia } from "../contexts/TriviaContext";

function QuestionOptions({ answers, correctAnswer }) {
  const { dispatch, userAnswer: answer } = useTrivia();

  const hasAnswered = answer !== null;

  return (
    <div className="options-container">
      {answers.map((answerMap, index) => (
        <button
          className={`btn btn-option ${
            answerMap === answer ? "selected" : ""
          } ${
            hasAnswered
              ? answerMap === correctAnswer
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={index}
          onClick={() => dispatch({ type: "newAnswer", payload: answerMap })}
          disabled={hasAnswered}
          dangerouslySetInnerHTML={{ __html: answerMap }}
        />
      ))}
    </div>
  );
}

export default QuestionOptions;
