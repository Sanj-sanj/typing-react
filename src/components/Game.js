import { useEffect, useRef, useState } from "react";
import TypeArea from "./TypeArea";
import UseQuote from "../hooks/UseQuote";

const Game = () => {
  const [getQuote, quote] = UseQuote();

  const [currentWord, setCurrentWord] = useState("");
  const [completedWords, setCompletedWords] = useState([]);
  const [userInput, setUserInput] = useState("");

  const currentQuote = useRef(quote?.quoteText);

  useEffect(() => {
    console.log("new game");
    currentQuote.current = quote.quoteText;
    setCompletedWords([]);
    if (currentWord !== "") {
      //if user plays a game, then plays another this resets the currword to be typed to '' then on next rerender it knows its been reset and next useffect picks up the correct curr word for the game to be played
      console.log("reset curr word");
      setCurrentWord("");
    }
  }, [quote]);

  function saveUserInput(input) {
    setUserInput(input);
  }

  const appendCurrentWordToCompletedWords = (
    newWord,
    completedWordsArr,
    setState
  ) => {
    setState(
      completedWordsArr
        .reduce((acc, curr) => {
          return (acc = [...acc, curr]);
        }, [])
        .concat(newWord)
    );
  };

  function filteredUserInput(word = "") {
    return [word].map((word) => {
      let i = 0;
      let val = "";
      while (word[i] !== undefined && word[i] === userInput[i]) {
        val += word[i];
        i++;
      }
      return val;
    });
  }

  return (
    <div>
      <div className="quoteGoesHere">
        <span style={{ color: "green" }}>{completedWords}</span>
        {currentWord?.startsWith(userInput) ? (
          <>
            <span style={{ color: "hotpink" }}>{userInput}</span>
            <span>{currentWord.replace(userInput, "")}</span>
          </>
        ) : (
          <>
            <span style={{ color: "red" }}>
              {filteredUserInput(currentWord)}
            </span>
            {/* handles the rest of the word */}
            {currentWord.replace(filteredUserInput(currentWord), "")}
          </>
        )}
        {typeof quote === "string"
          ? quote
          : currentQuote.current?.replace(
              completedWords.concat(currentWord).join(""),
              ""
            ) ?? "this is where the entire rest of quote is"}
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
        saveUserInput={saveUserInput}
      />
      <button onClick={getQuote}>Get Quote</button>
    </div>
  );
};

export default Game;
