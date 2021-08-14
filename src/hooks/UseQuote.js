import { useState, useEffect, useRef } from "react";
const UseQuote = () => {
  const [quote, setQuote] = useState("press button, start game ");
  const loading = useRef(false);
  const url = "https://fast-falls-76184.herokuapp.com/api/random";

  useEffect(() => {
    if (loading.current === true) {
      setTimeout(() => fetchQuote(url), 1400);
    }
  }, [quote]);

  function getQuote() {
    if (loading.current === true) return;
    setQuote("Retrieving quote...");
    loading.current = true;
  }

  function fetchQuote(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setQuote(data.quote);
        loading.current = false;
      })
      .catch(() => setQuote("An error occured"));
  }

  return [getQuote, quote];
};

export default UseQuote;
