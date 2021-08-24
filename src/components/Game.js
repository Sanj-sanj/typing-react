import { useEffect, useRef, useState } from "react";
import TypeArea from "./TypeArea";
import UseQuote from "../hooks/UseQuote";
import useInterval from "../hooks/useInterval";

const Game = () => {
  const [getQuote, quote] = UseQuote();

  const [currentWord, setCurrentWord] = useState("");
  const [completedWords, setCompletedWords] = useState([]);
  const [userInput, setUserInput] = useState("");

  const [gameStarted, setGameStarted] = useState(false);

  const currentQuote = useRef(quote?.quoteText);
  const gameScore = useRef(0);
  const gameDuration = useRef(0);

  const [delay, setDelay] = useState(null);
  useInterval(() => {
    gameDuration.current = gameDuration.current + 1;
    gameScore.current = calcCPM(
      gameDuration.current,
      completedWords.join("").concat(filteredUserInput(currentWord)).length
    );
  }, delay);

  useEffect(() => {
    console.log("new game");
    currentQuote.current = quote.quoteText;
    setCompletedWords([]);
    if (currentWord !== "") {
      //if user plays a game, then plays another this resets the currword to be typed to '' then on next rerender it knows its been reset and next useffect picks up the correct curr word for the game to be played
      console.log("reset curr word & timer");
      resetGameState();
    }
    if (typeof quote === "object") {
      //start game, by setting useInterval timeout to 1second, a number
      const id = setTimeout(() => {
        setDelay(1000), setGameStarted(true);
      }, 1000);
      return () => clearTimeout(id);
    }
  }, [quote]);

  useEffect(() => {
    if (
      !currentWord &&
      completedWords.join("").trim() === currentQuote.current?.trim()
    ) {
      console.log("finished");
      alert(
        "congrats it just took you " +
          gameDuration.current +
          " seconds. Your wpm is: " +
          gameScore.current
      );
      resetGameState();
    }
  }, [currentWord]);

  function calcCPM(seconds, completedLen) {
    const CPMtoWPM = ((completedLen / 5) * (60 / seconds)).toFixed();
    return CPMtoWPM;
  }

  function resetGameState() {
    setDelay(null);
    setCurrentWord("");
    setGameStarted(false);
    gameDuration.current = 0;
    gameScore.current = 0;
  }

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

  function filteredUserInput(word) {
    return [word].map((word) => {
      let i = 0;
      let val = "";
      //handle first character, if its not right, return first character, else loop over all characters.
      if (i === 0 && word[i] !== userInput[i]) return [word[i]];
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
        gameStarted={gameStarted}
        saveUserInput={saveUserInput}
      />
      <button onClick={getQuote}>Get Quote</button>
    </div>
  );
};

export default Game;
