import React from "react";

import Highlight from "./Highlight";
import { Link } from "react-router-dom";
import JsonRequest from "./JsonRequest";
import { resources } from "../mockapi";

class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      sentCount: props.sentCount || 0,
      customerCount: props.customerCount || 0
    };
  }

  renderFetchRequest() {
    return (
      <JsonRequest
        data={{ clientId: this.props.clientId }}
        resource={resources.error.code500 && resources.progress.pass}
        progressMessage="Fetching progress"
        onSuccess={obj => {
          this.setState(prevState => ({
            sentCount: prevState.sentCount + 1,
            customerCount: obj.customerCount
          }));
          /*
          this.setState({
            sentCount: obj.sentCount,
            customerCount: obj.customerCount
          });
          */
        }}
        validateResponse={json => !json.err}
        onComplete={() => {
          this.setState({ fetching: false });
          if (!this.props.stop) {
            setTimeout(
              () => this.setState({ fetching: true }),
              this.props.delay || 2000
            );
          }
        }}
      />
    );
  }

  render() {
    const {
      stop,
      sentCount: pSentCount,
      customerCount: pCustomerCount
    } = this.props;
    const {
      fetching,
      sentCount: sSentCount,
      customerCount: sCustomerCount
    } = this.state;
    return (
      <div className="mesblkml-progress">
        <div className="mesblkml-progress__status">
          {!stop && fetching ? this.renderFetchRequest() : null}
        </div>
        <div className="mesblkml-progress__stats">
          <span>{stop ? pSentCount : sSentCount}</span> /{" "}
          <span>{stop ? pCustomerCount : sCustomerCount}</span>{" "}
          <span>emails sent</span>
        </div>
      </div>
    );
  }
}
export default Progress;
