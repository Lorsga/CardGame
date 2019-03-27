import React from "react";
import ReactDOM from "react-dom";
import CardGame from "./CardGame";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Card Game</h1>
      <CardGame />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

