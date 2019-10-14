import React from "react";

import { Link } from "react-router-dom";
import JsonRequest from "./JsonRequest";
import Progress from "./Progress";

import { resources } from "../util";

class Sender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sending: true,
      fetchProgress: true,
      message: "",
      sentCount: 0,
      customerCount: 0
    };
  }

  renderSendRequest() {
    const {
      email: { postcodes, subject, message },
      progress: { clientId },
      isNewEmail,
      nonce
    } = this.props;
    const strPostcodes = postcodes
      .filter(o => "*" !== o.value)
      .map(o => o.value)
      .join(",");
    return (
      <JsonRequest
        data={{
          action: "mesbulkemailersend",
          nonce,
          postcodes: strPostcodes,
          subject,
          message,
          clientId,
          isnew: isNewEmail ? "yes" : "no"
        }}
        method="GET"
        resource={resources.error.code500 && resources.sender.pass}
        progressMessage="Processing"
        onSuccess={obj =>
          this.setState({
            sending: false,
            message: obj.msg,
            sentCount: obj.sentCount,
            customerCount: obj.customerCount
          })
        }
        onError={err => this.setState({ fetchProgress: false })}
        onRetry={() => this.setState({ fetchProgress: true })}
      />
    );
  }
  render() {
    const { sending, fetchProgress, message } = this.state;
    const {
      progress: { sentCount, customerCount },
      onRestart,
      onSentCountChange
    } = this.props;
    const element = sending ? (
      <div>
        <div className="mesblkml-sender__status">
          {this.renderSendRequest()}
        </div>
        <Progress
          sentCount={sentCount}
          customerCount={customerCount}
          stop={!fetchProgress}
          onSentCountChange={onSentCountChange}
        />
        {!fetchProgress && (
          <div className="mesblkml-retart">
            <Link
              to="/"
              onClick={() => {
                onRestart();
              }}
            >
              Home
            </Link>
          </div>
        )}
      </div>
    ) : (
      <div>
        <Progress
          stop={true}
          sentCount={this.state.sentCount}
          customerCount={this.state.customerCount}
          onSentCountChange={() => {}}
        />
        <div className="mesblkml-result">
          <div>Completed</div>
          <div>{message}</div>
        </div>
        <div className="mesblkml-retart">
          <Link
            to="/"
            onClick={() => {
              onRestart();
            }}
          >
            Home
          </Link>
        </div>
        <div />
      </div>
    );
    return <div className="mesblkml-sender">{element}</div>;
  }
}
export default Sender;
