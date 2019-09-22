import React from "react";
import { MemoryRouter as Router } from "react-router";
import { Route } from "react-router-dom";

import Quota from "./Quota";
import LastEmailResumer from "./LastEmailResumer";
import Composer from "./Composer";
import Navigation from "./Navigation";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        postcode: "",
        subject: "",
        message: ""
      }
    };
  }
  buildEmailObj(obj) {
    console.log("buldema claled");
    return {
      postcode: (obj && obj.postcode) || "",
      subject: (obj && obj.subject) || "",
      message: (obj && obj.message) || ""
    };
  }
  buildProgressObj(obj) {
    return {
      sentCount: (obj && obj.sentCount) || 0,
      subject: (obj && obj.customerCount) || 0
    };
  }

  handleLastEmailFound = lastEmail => {
    this.setState({
      email: this.buildEmailObj(lastEmail),
      progress: this.buildProgressObj(lastEmail)
    });
  };

  handleLastEmailDiscard = () => {
    this.setState({
      email: this.buildEmailObj(null),
      progress: this.buildProgressObj(null)
    });
  };

  handleEmailDraftChange = e => {
    const { name, value } = e.target;
    this.setState({
      email: { ...this.state.email, [name]: value }
    });
  };

  render() {
    const { email, progress } = this.state;
    return (
      <Router initialEntries={["/", "/compose", "/preview"]}>
        <Route
          path="/"
          exact
          render={() => (
            <div id="mesblkml-home">
              <h2>Home</h2>
              <Quota />
              <LastEmailResumer
                onLastEmailFound={this.handleLastEmailFound}
                onLastEmailDiscard={this.handleLastEmailDiscard}
                lastEmail={{ ...email, ...progress }}
              />
            </div>
          )}
        />
        <Route
          path="/compose"
          exact
          render={() => (
            <div id="mesblkml-compose">
              <h2>Compose Email</h2>
              <Composer
                {...this.state.email}
                allPostcodes={this.props.allPostcodes}
                onChange={this.handleEmailDraftChange}
              />
              <Navigation
                prevPath="/"
                prevLabel="Home"
                nextPath="/preview"
                nextLabel="Preview"
              />
            </div>
          )}
        />
        <Route
          path="/preview"
          exact
          render={() => (
            <div id="mesblkml-preview">
              <h2>Preview Email</h2>
              {JSON.stringify(this.state.email)}
              <Navigation
                prevPath="/compose"
                prevLabel="compose"
                nextPath="/process"
                nextLabel="Confirm & Send"
              />
            </div>
          )}
        />
        <Route
          path="/process"
          exact
          render={() => (
            <div id="mesblkml-process">
              <h2>Sending Email</h2>
              {JSON.stringify(this.state.email)}
              <Navigation prevPath="/preview" prevLabel="Preview" />
            </div>
          )}
        />
      </Router>
    );
  }
}
export default App;
