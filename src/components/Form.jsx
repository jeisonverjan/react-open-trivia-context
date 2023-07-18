import { useTrivia } from "../contexts/TriviaContext";
import FormCategories from "./FormCategories";

function Form() {
  const { numQuestions, difficulty, dispatch } = useTrivia();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "questions/loading" });
  }

  function handleInputChange(event) {
    dispatch({
      type: "form/updated",
      field: event.target.name,
      value: event.target.value,
    });
  }

  return (
    <form className="form-trivia" onSubmit={handleSubmit}>
      <div className="form-trivia-item">
        <label htmlFor="num-questions">Number of questions:</label>
        <input
          id="num-questions"
          name="numQuestions"
          type="number"
          value={numQuestions}
          onChange={handleInputChange}
          max={50}
          min={1}
          required
        ></input>
      </div>

      <div className="form-trivia-item">
        <label htmlFor="category">Select category:</label>
        <FormCategories />
      </div>

      <div className="form-trivia-item">
        <label htmlFor="difficulty">Select difficulty:</label>
        <select
          id="difficulty"
          name="difficulty"
          value={difficulty}
          onChange={handleInputChange}
        >
          <option value={""}>Any Category</option>
          <option value={"easy"}>Easy</option>
          <option value={"medium"}>Medium</option>
          <option value={"hard"}>Hard</option>
        </select>
      </div>

      <div className="form-trivia-item btn-box">
        <button className="btn btn-form" type="submit">
          Start
        </button>
      </div>
    </form>
  );
}

export default Form;
