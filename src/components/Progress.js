import React from "react";

import Highlight from "./Highlight";
import { Link } from "react-router-dom";
import JsonRequest from "./JsonRequest";
import { resources } from "../mockapi";

class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  renderFetchRequest() {
    return (
      <JsonRequest
        data={{ clientId: this.props.clientId }}
        resource={resources.error.code500 && resources.progress.pass}
        progressMessage="Fetching progress"
        onSuccess={obj => {
          console.log(this.props);
          this.mounted &&
            this.props.onSentCountChange(this.props.sentCount + 1);
        }}
        onComplete={() => {
          this.mounted && this.setState({ fetching: false });
          if (!this.props.stop) {
            setTimeout(
              () => this.mounted && this.setState({ fetching: true }),
              this.props.delay || 2000
            );
          }
        }}
      />
    );
  }

  render() {
    const { stop, sentCount, customerCount } = this.props;
    return (
      <div className="mesblkml-progress">
        <div className="mesblkml-progress__stats">
          <span>{sentCount}</span> / <span>{customerCount}</span>{" "}
          <span>emails sent</span>
        </div>
        <div className="mesblkml-progress__status">
          {!stop && this.state.fetching ? (
            this.renderFetchRequest()
          ) : (
            <div>&nbsp;</div>
          )}
        </div>
      </div>
    );
  }
}
export default Progress;
