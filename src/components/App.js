import React from "react";
import { MemoryRouter as Router } from "react-router";
import { Route } from "react-router-dom";
import Quota from "./Quota";
import LastEmailResumer from "./LastEmailResumer";

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
              {JSON.stringify(this.state.email)}
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
            </div>
          )}
        />
      </Router>
    );
  }
}
export default App;
