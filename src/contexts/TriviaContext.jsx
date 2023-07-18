import { createContext, useContext, useEffect, useReducer } from "react";

const triviaContext = createContext();
const initialState = {
  //loading, ready, fetching, active, finish, error
  status: "loading",
  category: "",
  numQuestions: 5,
  difficulty: "",
  questions: [],
  index: 0,
  score: 0,
  userAnswer: null,
  secondsRemaining: null,
};
const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "categories/loaded":
      return { ...state, status: "ready" };
    case "category/changed":
      return { ...state, category: Number(action.payload) };
    case "dataFailed":
      return { ...state, status: "error" };
    case "form/updated":
      return { ...state, [action.field]: action.value };
    case "questions/loading":
      return { ...state, status: "fetching" };
    case "questions/loaded":
      return {
        ...state,
        questions: action.payload,
        status: "active",
        secondsRemaining: Number(state.numQuestions) * SECS_PER_QUESTION,
      };
    case "newAnswer":
      var question = state.questions.at(state.index);
      var points =
        question.difficulty === "easy"
          ? 10
          : question.difficulty === "medium"
          ? 20
          : 30;
      return {
        ...state,
        userAnswer: action.payload,
        score:
          question.correct_answer === action.payload
            ? state.score + points
            : state.score,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        userAnswer: null,
      };

    case "finish":
      return { ...state, status: "finished" };

    case "reset":
      return { ...initialState };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

function TriviaProvider({ children }) {
  const [
    {
      status,
      category,
      numQuestions,
      difficulty,
      questions,
      index,
      score,
      userAnswer,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPossiblePoints = questions.reduce(
    (prev, cur) =>
      prev +
      (cur.difficulty === "easy" ? 10 : cur.difficulty === "medium" ? 20 : 30),
    0
  );

  useEffect(
    function () {
      if (status !== "fetching") return;
      async function fetchQuestions() {
        const res = await fetch(
          `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
        );
        const data = await res.json();
        dispatch({ type: "questions/loaded", payload: data.results });
      }
      fetchQuestions();
    },
    [numQuestions, category, difficulty, status]
  );

  return (
    <triviaContext.Provider
      value={{
        status,
        category,
        numQuestions,
        difficulty,
        questions,
        index,
        score,
        userAnswer,
        maxPossiblePoints,
        secondsRemaining,
        dispatch,
      }}
    >
      {children}
    </triviaContext.Provider>
  );
}

function useTrivia() {
  const context = useContext(triviaContext);
  if (context === undefined)
    throw new Error("The CitiesContext was used outside of the CitiesProvider");
  return context;
}

export { TriviaProvider, useTrivia };
