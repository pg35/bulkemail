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
      message: ""
    };
  }

  renderSendRequest() {
    return (
      <JsonRequest
        data={{ clientId: this.props.clientId, "mocky-delay": "6000ms" }}
        resource={resources.error.code500 && resources.sender.pass}
        progressMessage="Processing"
        onSuccess={obj =>
          this.setState({
            sending: false,
            message: obj.msg
          })
        }
        onError={err => this.setState({ fetchProgress: false })}
        onRetry={() => this.setState({ fetchProgress: true })}
      />
    );
  }
  render() {
    const { sending, fetchProgress, message } = this.state;
    const { sentCount, customerCount, onRestart } = this.props;
    const element = sending ? (
      <div>
        <div className="mesblkml-sender__status">
          {this.renderSendRequest()}
        </div>
        <Progress {...this.props} stop={!fetchProgress} />
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
          sentCount={sentCount}
          customerCount={customerCount}
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
