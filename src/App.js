import ReactDOM from "react-dom";
import { useReducer, useContext } from "react";
import { userStatsContext, reducer } from "./context/userStatsContext";
import Game from "./components/Game";
import Nav from "./components/nav/Nav";
import Stats from "./components/stats/stats";

const App = () => {
  const initial = useContext(userStatsContext);
  const [state, dispatch] = useReducer(reducer, initial);
  return (
    <div className="flex flex-col items-center">
      <userStatsContext.Provider value={{ state, dispatch }}>
        <Nav />
        <div className="container h-full flex flex-col items-center border-2 border-purple-500 py-4">
          <Game />
          {state.gameHistory?.map((state, i) => (
            <Stats
              key={i}
              speed={state.duration}
              wpm={state.wpm}
              quote={state.quote}
            />
          ))}
        </div>
      </userStatsContext.Provider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
