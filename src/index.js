import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import App from "./components/App";
import Quota from "./components/Quota";
import Composer from "./components/Composer";
import Navigation from "./components/Navigation";
import Progress from "./components/Progress";
const delay = ms => cb => setTimeout(cb, ms);
const allPostcodes = [1, 2, 3, 4, 5, 6, 7];

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        postcode: "4",
        subject: "abc",
        message: "xad"
      },
      stop: false,
      sentCount: 34,
      stopCount: 100
    };
  }
  render() {
    return (
      <div>
        {!this.state.stop ? (
          <Progress sentCount={34} customerCount={0} stop={this.state.stop} />
        ) : (
          <Progress
            sentCount={this.state.sentCount}
            customerCount={this.state.customerCount}
            stop={this.state.stop}
          />
        )}
        <button
          onClick={() =>
            this.setState(p => ({
              stop: !p.stop,
              sentCount: 100,
              customerCount: 200
            }))
          }
        >
          {!this.state.stop ? "stop" : "start"}
        </button>
      </div>
    );
  }
}
function App2() {
  return (
    <App
      quota={{ limit: 100, used: 55, nextRenewal: "in" }}
      allPostcodes={allPostcodes}
    />
  );
}

const rootElement = document.getElementById("mesblkml");
ReactDOM.render(<Test />, rootElement);
