import { useEffect, useState } from "react";

// function validate(currQuote, currentWord, setCurr) {
//   // console.log("recall");
//   let toUse = currQuote.split(" ");
//   function assign(currQuote, currentWord, setCurr, word) {
//     //   console.log(word);
//     //   console.log(curr);
//     if (word === currentWord) {
//       console.log("its a match");
//       const next = toUse.shift();
//       setCurr(next);
//       // quote.length ? setCurr(toUse.shift()) : setCurr("");
//     }
//   }
//   return assign;
// }

// function validate() {
//   let words;

//   function assign(userInput, quote) {
//     words = words ?? quote.split(" ");

//     if (userInput === curr) {
//       console.log("matched input");
//       setCurr(words.shift());
//     }
//   }
//   return assign;
// }
// let validator = validate();
const TypeArea = ({ quote }) => {
  const [currentWord, setCurrentWord] = useState("");
  const [index, setIndex] = useState(0);
  //   const validator = validate(quote, curr, setCurr);

  useEffect(() => {
    if (quote) {
      console.log("newWord");
      setIndex(0);
      setCurrentWord(quote.split(" ")[index] + " ");
    }
  }, [quote]);

  function nextWord() {
    //   console.log(currentWord);
    const wordsAray = quote.split(" ");
    const last = wordsAray.length - 1;
    //check to see if the next word is the last word, if it isn't padd the end with whitespace.
    const next =
      index + 1 === last ? wordsAray[index + 1] : wordsAray[index + 1] + " ";
    if (index === last) {
      prompt("you're done bud");
    }
    setCurrentWord(next);
    setIndex(index + 1);
  }

  return (
    <input
      onKeyUp={(e) => {
        e.target.value === currentWord
          ? (nextWord(), (e.target.value = ""))
          : null;
      }}
    ></input>
  );
};

export default TypeArea;
