import { useTrivia } from "../contexts/TriviaContext";

function Progress() {
  const {
    numQuestions,
    index,
    userAnswer: answer,
    score,
    maxPossiblePoints,
  } = useTrivia();

  return (
    <header className="progress-container">
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        Score: <strong>{score}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
