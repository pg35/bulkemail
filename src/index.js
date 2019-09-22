import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import App from "./components/App";
import Quota from "./components/Quota";
import LastEmailResumer from "./components/LastEmailResumer";
import Composer from "./components/Composer";
import Navigation from "./components/Navigation";

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
      }
    };
  }
  render() {
    return (
      <div>
        <Composer
          {...this.state.email}
          {...this.props}
          onChange={e => {
            const { name, value } = e.target;
            this.setState({
              email: { ...this.state.email, [name]: value }
            });
          }}
        />
      </div>
    );
  }
}
const rootElement = document.getElementById("mesblkml");
ReactDOM.render(<App allPostcodes={allPostcodes} />, rootElement);
