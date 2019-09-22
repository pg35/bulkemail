import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import App from "./components/App";
import Quota from "./components/Quota";
import LastEmailResumer from "./components/LastEmailResumer";
const delay = ms => cb => setTimeout(cb, ms);

function Test() {
  return (
    <div className="App">
      <App />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Test />, rootElement);
