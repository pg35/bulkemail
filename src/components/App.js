import React from "react";
import { MemoryRouter as Router } from "react-router";
import { Route, Switch } from "react-router-dom";

import HomePage from "./HomePage";
import Composer from "./Composer";
import Navigation from "./Navigation";
import JsonRequest from "./JsonRequest";

import { resources } from "../mockapi";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      init: false,
      isNewEmail: true,
      clientId: "",
      email: {
        postcode: "",
        subject: "",
        message: ""
      },
      progess: {
        sentCount: 0,
        customerCount: 0
      },
      quota: {}
    };
  }

  buildEmailObj(obj) {
    return {
      postcode: (obj && obj.postcode) || "",
      subject: (obj && obj.subject) || "",
      message: (obj && obj.message) || ""
    };
  }

  buildProgressObj(obj) {
    return {
      sentCount: (obj && obj.sentCount) || 0,
      customerCount: (obj && obj.customerCount) || 0
    };
  }

  handleSavedEmailFound = lastEmail => {
    this.setState({
      isNewEmail: false,
      email: this.buildEmailObj(lastEmail),
      progress: this.buildProgressObj(lastEmail)
    });
  };

  handleSavedEmailDelete = () => {
    this.setState({
      isNewEmail: true,
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

  renderInitRequest() {
    return (
      <JsonRequest
        resource={resources.error.code500 || resources.app.hasSavedEmail}
        progressMessage="Initializing App"
        onSuccess={obj => {
          console.log("app::", obj);
          this.setState({
            init: true,
            isNewEmail: !obj.savedEmail,
            clientId: obj.savedEmail ? obj.savedEmail.clientId : "",
            email: this.buildEmailObj(obj.savedEmail),
            progress: this.buildProgressObj(obj.savedEmail),
            quota: obj.quota
          });
        }}
        validateResponse={json => !json.err}
        onComplete={() => "app oncomplete called"}
      />
    );
  }

  componentWillUnmount() {
    console.log("app: unmounting");
  }
  render() {
    const { init, isNewEmail, email, progress, quota } = this.state;
    return !init ? (
      this.renderInitRequest()
    ) : (
      <Router initialEntries={["/", "/compose", "/preview"]}>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <HomePage
                quota={quota}
                savedEmail={isNewEmail ? null : { ...email, ...progress }}
                onSavedEmailDelete={this.handleSavedEmailDelete}
              />
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
                  prevPath={isNewEmail ? "/compose" : "/"}
                  prevLabel={isNewEmail ? "Compose" : "Home"}
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
        </Switch>
      </Router>
    );
  }
}
export default App;
