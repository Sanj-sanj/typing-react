import ReactDOM from "react-dom";
import { useReducer, useContext } from "react";
import { userStatsContext, reducer } from "./context/userStatsContext";
import Game from "./components/Game";
import Nav from "./components/nav/Nav";
const App = () => {
  const initial = useContext(userStatsContext);
  const [state, dispatch] = useReducer(reducer, initial);
  return (
    <>
      <userStatsContext.Provider value={{ state, dispatch }}>
        <Nav />
        <Game />
      </userStatsContext.Provider>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
