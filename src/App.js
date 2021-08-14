// import { useEffect, useState } fr  om "react";
import ReactDOM from "react-dom";
import TypeArea from "./components/TypeArea";
import UseQuote from "./hooks/UseQuote";

const App = () => {
  const [getQuote, quote] = UseQuote();
  // const [type, setType] = useState("");
  // useEffect(() => {
  //   setType(quote?.quoteText ?? "");
  // }, [quote]);

  return (
    <div>
      <div className="quoteGoesHere">
        {typeof quote === "string" ? quote : quote.quoteText}
      </div>
      <TypeArea quote={quote?.quoteText ?? ""} />
      {/* <input type="text"></input> */}
      <button onClick={getQuote}>get Quote</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
