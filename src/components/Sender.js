import React from "react";

import Highlight from "./Highlight";
import { Link } from "react-router-dom";
import JsonRequest from "./JsonRequest";
import { resources } from "../mockapi";

function Progress(props) {
  return "progress";
}

class Sender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sending: true,
      result: {
        label: "Complete",
        message: "hello world"
      }
    };
  }

  componentDidMount() {}

  render() {
    const {
      sending,
      result: { label, message }
    } = this.state;
    const element = sending ? (
      <Progress />
    ) : (
      <div>
        <Progress stop={true} />
        <div>
          <h3>{label}</h3>
          <div>{message}</div>
        </div>

        <Link to="/">Home</Link>
        <div />
      </div>
    );
    return <div>{element}</div>;
  }
}
export default Sender;
