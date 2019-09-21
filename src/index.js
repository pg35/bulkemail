import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import JsonRequest from "./components/JsonRequest";
import Quota from "./components/Quota";
const delay = ms => cb => setTimeout(cb, ms);

function App() {
  return (
    <div className="App">
      {/*<JsonRequest
        data={{ name: "abcnew", job: "vverywel" }}
        method="POST"
        onSuccess={console.log}
        onError={console.log}
        onComplete={() => "completed"}
        label="hell owlrd"
  />*/}
      <Quota />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
