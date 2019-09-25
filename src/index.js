import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import App from "./components/App";
import Quota from "./components/Quota";
import Composer from "./components/Composer";
import Navigation from "./components/Navigation";
import Progress from "./components/Progress";
import Sender from "./components/Sender";
import Field from "./components/Field";

const delay = ms => cb => setTimeout(cb, ms);
const allPostcodes = [1, 2, 3, 4, 5, 6, 7];
if (!String.prototype.trim) {
  String.prototype.trim = function() {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  };
}

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        postcode: "",
        subject: "abc",
        message: "xad",
        dirty: false
      },
      stop: false,
      sentCount: 34,
      stopCount: 100
    };
  }
  handleEmailDraftChange = e => {
    const { name, value } = e.target;
    this.setState({
      email: { ...this.state.email, [name]: value }
    });
  };
  render() {
    return (
      <div>
        <Composer
          {...this.state.email}
          onChange={this.handleEmailDraftChange}
          allPostcodes={allPostcodes}
        />
        <button
          onClick={() =>
            this.setState(p => {
              return {
                email: { ...p.email, dirty: !p.email.dirty }
              };
            })
          }
        >
          {!this.state.email.dirty ? "dirty" : "undirty"}
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
ReactDOM.render(<App2 />, rootElement);
