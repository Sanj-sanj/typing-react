import { createContext } from "react";

export const userStatsContext = createContext({
  user: "Guest",
  gameHistory: [],
});

export const reducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case "updateHistory":
      return { ...state, gameHistory: [...state.gameHistory, payload] };
    //   break;

    default:
      break;
  }
};
