import { createContext } from "react";

export const userStatsContext = createContext({
  user: "Guest",
  gameHistory: [
    {
      quote: {
        quoteAuthor: "Rock Lee",
        addressing: "(To Kakashi and Gaara) ",
        quoteText:
          "I'm not sad!! In front of a man who made an important decision... feeling sadness or pity would be an insult to him!!!",
        _id: "GuUg6N0nm9",
        id: "9",
      },
      wpm: "71",
      duration: 120,
    },
  ],
});

export const reducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case "updateHistory":
      return { ...state, gameHistory: [...state.gameHistory, payload] };
    default:
      break;
  }
};
