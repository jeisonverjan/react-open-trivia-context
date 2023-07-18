import { useEffect } from "react";
import { useTrivia } from "../contexts/TriviaContext";

function Timer() {
  const { secondsRemaining, dispatch } = useTrivia();
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  
  useEffect(
    function () {
      const tick = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(tick);
    },

    [dispatch]
  );
  return (
    <div className="timer btn">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
