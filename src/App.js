import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import TypeArea from "./components/TypeArea";
import UseQuote from "./hooks/UseQuote";

const App = () => {
  const [getQuote, quote] = UseQuote();
  const [currentWord, setCurrentWord] = useState("");
  const [completedWords, setCompletedWords] = useState([]);
  // const [currentQuote, setCurrentQuote] = useState(quote?.quoteText);
  const currentQuote = useRef(quote?.quoteText);

  useEffect(() => {
    console.log("new game");
    currentQuote.current = formatCurentQuote(quote.quoteText);
    setCompletedWords([]);
    if (currentWord !== "") {
      console.log("reset curr word");
      setCurrentWord("");
    }
  }, [quote]);

  useEffect(() => {
    console.log("game updater");
    if (!currentQuote.current && !completedWords.length) {
      //if in a game, and user asks for anothe quote
      console.log("on reset");
    }
    currentQuote.current = formatCurentQuote(currentQuote.current);

    // setCurrentQuote(currentQuote.split(" ").slice(1).join(" "));
    console.log("here is now");
  }, [currentWord]);

  function formatCurentQuote(words = "") {
    //removes the first word from string to fit current word to be typed
    return words.split(" ").slice(1).join(" ");
  }

  const appendCurrentWordToCompletedWords = (
    newWord,
    completedWordsArr,
    setState
  ) => {
    return setState(
      completedWordsArr
        .reduce((acc, curr) => {
          return (acc = [...acc, curr]);
        }, [])
        .concat(newWord)
    );
  };
  return (
    <div>
      <div className="quoteGoesHere">
        <span style={{ color: "green" }}>{completedWords}</span>
        <span style={{ color: "purple" }}>{currentWord}</span>
        {typeof quote === "string"
          ? quote
          : currentQuote.current ?? "thisiswat "}
      </div>
      <TypeArea
        quote={quote?.quoteText ?? ""}
        setCurrentWord={setCurrentWord}
        append={(newWord) =>
          appendCurrentWordToCompletedWords(
            newWord,
            completedWords,
            setCompletedWords
          )
        }
      />
      <button onClick={getQuote}>Get Quote</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
