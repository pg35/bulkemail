import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import Quota from "./components/Quota";
import LastEmailResumer from "./components/LastEmailResumer";
const delay = ms => cb => setTimeout(cb, ms);

function Test() {
  return (
    <div className="App">
      <Quota />
      <LastEmailResumer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Test />, rootElement);
