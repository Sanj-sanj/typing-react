import { useEffect, useRef } from "react";

const TypeArea = ({
  quote,
  setCurrentWord,
  append,
  gameStarted,
  saveUserInput,
}) => {
  const index = useRef(0);
  const wordsArray = quote.split(" ");
  const inputRef = useRef(null);
  useEffect(() => {
    //if gameStarted changes, that means game begun or ended, reset index and set currWord to [0] position of new quote.
    inputRef.current.value = "";
    if (gameStarted) {
      index.current = 0;
      setCurrentWord(quote.split(" ")[0] + " ");
      inputRef.current.focus();
    }
  }, [gameStarted]);

  function nextWord(userInput) {
    const i = index.current;
    const last = wordsArray.length - 1;
    const currentWord = i === last ? wordsArray[i] : wordsArray[i] + " ";
    const nextWord =
      i + 1 >= last ? wordsArray[i + 1] : wordsArray[i + 1] + " ";

    if (userInput === currentWord) {
      //check to see if the next word is the last word, if it isn't padd the end with whitespace.
      setCurrentWord(nextWord ?? "");
      index.current = i + 1;
      return true;
    }
  }

  return (
    <input
      onKeyUp={(e) => {
        saveUserInput(e.target.value);
        nextWord(e.target.value) === true
          ? (append(e.target.value), (e.target.value = ""), saveUserInput(""))
          : null;
      }}
      disabled={gameStarted ? false : true}
      ref={inputRef}
    ></input>
  );
};

export default TypeArea;
