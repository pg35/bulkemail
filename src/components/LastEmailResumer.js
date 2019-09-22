import React from "react";
import JsonRequest from "./JsonRequest";
import Highlight from "./Highlight";
import { Link } from "react-router-dom";
import { resources } from "../mockapi";

class LastEmailResumer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  renderJsonRequest() {
    console.log(resources.resumer.pass.hasLastemail);
    return (
      <JsonRequest
        resource={resources.resumer.pass.hasLastEmail}
        progressMessage="Checking status of last email operation"
        onSuccess={obj => {
          console.log(obj);
          if (obj.lastEmail) {
            this.props.onLastEmailFound(obj.lastEmail);
          }
        }}
        onComplete={() =>
          this.setState({
            loading: false
          })
        }
        validateResponse={json => !json.err}
      />
    );
  }

  renderLastEmailInfo() {
    const { postcode, sentCount, customerCount } = this.props.lastEmail;
    return (
      <div>
        <p>
          Previously, email destined for postcode <Highlight v={postcode} /> was
          sent to <Highlight v={sentCount} /> out of{" "}
          <Highlight v={customerCount} /> customers.
          <br />
          It was saved to be sent to the remaining{" "}
          <Highlight v={customerCount - sentCount} /> customers.
          <br />
          Send it now or discard it.
        </p>
        <div>
          <Link
            to="/"
            onClick={e => {
              console.log("link clicked");
              this.props.onLastEmailDiscard();
            }}
          >
            Discard Saved Email
          </Link>
          <Link to="/preview">Preview Last Email</Link>
        </div>
      </div>
    );
  }
  render() {
    console.log(this.props);
    const element =
      this.state.loading || this.props.refresh ? (
        this.renderJsonRequest()
      ) : this.props.lastEmail.postcode ? (
        this.renderLastEmailInfo()
      ) : (
        <Link to="/compose">Compose Email</Link>
      );
    return <div>{element}</div>;
  }
}

export default LastEmailResumer;
