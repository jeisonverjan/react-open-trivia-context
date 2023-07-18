import { useTrivia } from "../contexts/TriviaContext";

function FinishScreen() {
const {score, maxPossiblePoints, dispatch} = useTrivia()
  const percentage = (score / maxPossiblePoints) * 100;
  return (
    <div className="aux-container finish-container">
      <p className="result">
        You scored <strong>{score}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>
      <button
        className="btn btn-reset"
        onClick={() => dispatch({ type: "reset" })}
      >
        Reset
      </button>
    </div>
  );
}

export default FinishScreen;
