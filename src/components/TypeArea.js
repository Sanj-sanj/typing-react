import { useEffect, useState } from "react";

const TypeArea = ({ quote, setCurrentWord, append, saveUserInput }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    //if quote changes, that means new game begun, reset index and set currWord to [0] position.
    if (quote) {
      setIndex(0);
      setCurrentWord(quote.split(" ")[0] + " ");
    }
  }, [quote]);

  function nextWord(userInput) {
    const wordsArray = quote.split(" ");
    const last = wordsArray.length - 1;
    const currentWord =
      index === last ? wordsArray[index] : wordsArray[index] + " ";
    const nextWord =
      index + 1 >= last ? wordsArray[index + 1] : wordsArray[index + 1] + " ";

    if (userInput === currentWord) {
      //check to see if the next word is the last word, if it isn't padd the end with whitespace.
      // if (index === last) {
      //   alert("you're done bud");
      // }
      setCurrentWord(nextWord ?? "");
      setIndex(index + 1);
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
    ></input>
  );
};

export default TypeArea;
