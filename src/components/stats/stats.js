const Stats = ({ speed, wpm, quote }) => {
  console.log(speed, wpm, quote);

  function getTime(speed) {
    return speed / 60 <= 0
      ? speed
      : `${(speed / 60).toFixed()}:${
          speed % 60 < 10 ? "0" + (String(speed) % 60) : String(speed) % 60
        }`;
  }

  return (
    <div className="border-2 border-red-300 rounded p-2 m-3 w-11/12 sm:w-3/5">
      Nice job!
      <p>Time: {getTime(speed)}</p>
      <p>WPM: {wpm}</p>
      Quote Details:
      <p>
        {quote.quoteAuthor} - {quote.addressing}
      </p>
      Quote Text:
      <p>{quote.quoteText}</p>
    </div>
  );
};

export default Stats;
