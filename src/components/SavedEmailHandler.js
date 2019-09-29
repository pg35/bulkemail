import React from "react";

import Highlight from "./Highlight";
import { Link } from "react-router-dom";
import JsonRequest from "./JsonRequest";
import { resources, plural } from "../util";

class SavedEmailHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deletingSavedEmail: false
    };
  }

  renderSavedEmailInfo() {
    const { postcodes, sentCount, customerCount } = this.props.savedEmail;
    const remaining = customerCount - sentCount;
    return (
      <div>
        <div>
          Previously, email destined for{" "}
          {plural(postcodes.length, "postcodes", "postcode") + " "}
          <span>
            <Highlight
              v={postcodes.filter(o => "*" !== o.value).map(o => o.value)}
            />
          </span>{" "}
          was sent to <Highlight v={sentCount} /> out of{" "}
          <Highlight v={customerCount} />
          {" " + plural(customerCount, "customers", "customer")}.
          <br />
          It was saved to be sent to the remaining <Highlight v={remaining} />
          {" " + plural(customerCount, "customers", "customer")}.
          <br />
          Send it now or delete it.
        </div>
        <div style={{ marginTop: "20px" }}>
          {this.state.deletingSavedEmail ? (
            this.renderDeleteRequest()
          ) : (
            <div className="mes-stack">
              <Link
                to="/"
                onClick={e => {
                  if (
                    window.confirm(
                      `The saved email is still to be sent to ${remaining} ${plural(
                        customerCount,
                        "customers",
                        "customer"
                      )}.\nAre you sure you want to delete it?`
                    )
                  ) {
                    this.setState({
                      deletingSavedEmail: true
                    });
                  } else {
                    e.preventDefault();
                  }
                }}
              >
                Delete Saved Email
              </Link>
              <Link to="/preview" style={{ marginLeft: "20px" }}>
                Preview & Send Saved Email
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  renderDeleteRequest() {
    return (
      <JsonRequest
        resource={resources.error.code500 && resources.delSavedEmail.pass}
        progressMessage="Deleting saved email"
        onSuccess={obj => {
          console.log("delete saved email::", obj);
          this.setState({
            deletingSavedEmail: false
          });
          this.props.onSavedEmailDelete();
        }}
      />
    );
  }
  render() {
    const element = this.props.savedEmail ? (
      this.renderSavedEmailInfo()
    ) : (
      <Link to="/compose">Compose Email</Link>
    );
    return <div>{element}</div>;
  }
}
export default SavedEmailHandler;
