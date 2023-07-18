import Form from "./components/Form";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import FormCategories from "./components/FormCategories";
import Question from "./components/Question";
import Progress from "./components/Progress";
import Footer from "./components/Footer";

import { useTrivia } from "./contexts/TriviaContext";
import Timer from "./components/Timer";
import NextButton from "./components/NextButton";
import FinishScreen from "./components/FinishScreen";

function App() {
  const { status } = useTrivia();
  return (
    <div className="main-container">
      <Header />
      {status === "loading" && (
        <>
          <Loader />
          <FormCategories />
        </>
      )}
      {status === "error" && <Error />}
      {status === "ready" && (
        <StartScreen>
          <Form />
        </StartScreen>
      )}
      {status === "fetching" && <Loader />}
      {status === "active" && (
        <>
          <Progress />
          <Question />
          <Footer>
            <Timer />
            <NextButton />
          </Footer>
        </>
      )}
      {status === "finished" && <FinishScreen />}
    </div>
  );
}

export default App;
