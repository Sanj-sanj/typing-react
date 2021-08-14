import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import TypeArea from "./components/TypeArea";
import UseQuote from "./hooks/UseQuote";

const App = () => {
  const [getQuote, quote] = UseQuote();
  const [currentWord, setCurrentWord] = useState("");
  // const [completedWords, setCompletedWords] = useState("");

  useEffect(() => {
    console.log(currentWord);
  }, [currentWord]);

  return (
    <div>
      <div className="quoteGoesHere">
        {typeof quote === "string"
          ? quote
          : quote.quoteText.split(" ").join(" ")}
      </div>
      <TypeArea
        quote={quote?.quoteText ?? ""}
        setCurrentWord={setCurrentWord}
      />
      <button onClick={getQuote}>Get Quote</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
