import React from "react";
import { MemoryRouter as Router } from "react-router";
import { Route, Switch } from "react-router-dom";

import HomePage from "./HomePage";
import Composer from "./Composer";
import Sender from "./Sender";
import Navigation from "./Navigation";
import JsonRequest from "./JsonRequest";

import { resources } from "../mockapi";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initCount: 0,
      isNewEmail: true,
      email: {
        postcode: "",
        subject: "",
        message: "",
        dirty: false
      },
      progress: {
        sentCount: 0,
        customerCount: 0,
        clientId: ""
      },
      quota: {}
    };
  }

  buildEmailObj(obj) {
    return {
      postcode: (obj && obj.postcode) || "",
      subject: (obj && obj.subject) || "",
      message: (obj && obj.message) || "",
      dirty: !!obj
    };
  }

  buildProgressObj(obj) {
    return {
      sentCount: (obj && obj.sentCount) || 0,
      customerCount: (obj && obj.customerCount) || 0,
      clientId: (obj && obj.clientId) || ""
    };
  }

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

  handleSentCountChange = newCount => {
    this.setState({
      progress: { ...this.state.progress, sentCount: newCount }
    });
  };

  handleRestart = () =>
    this.setState(prevState => ({ initCount: prevState.initCount + 1 }));

  renderInitRequest() {
    return (
      <JsonRequest
        resource={resources.error.custom && resources.app.hasSavedEmail}
        progressMessage={
          !this.state.initCount ? "Initializing App" : "Fetching status"
        }
        onSuccess={obj => {
          console.log("app::", obj);
          this.setState(prevState => ({
            initCount: prevState.initCount + 1,
            isNewEmail: !obj.savedEmail,
            email: this.buildEmailObj(obj.savedEmail),
            progress: this.buildProgressObj(obj.savedEmail),
            quota: obj.quota
          }));
        }}
        onValidateResponse={json => !json.err}
        onComplete={() => "app oncomplete called"}
      />
    );
  }

  componentWillUnmount() {
    console.log("app: unmounting");
  }

  render() {
    console.log("app state", this.state);
    const { initCount, isNewEmail, email, progress, quota } = this.state;
    const emailValidation = Object.keys(email).reduce(
      (o, p) => ({ ...o, [p]: !!String(email[p]).trim() }),
      {}
    );
    const isInvalidEmail = Object.keys(emailValidation).filter(
      p => !emailValidation[p]
    ).length;

    return !(initCount % 2) ? (
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
                  validation={emailValidation}
                />
                {email.dirty && isInvalidEmail ? (
                  <div className="mes-error">
                    Please fill in all fields before proceeding to Preview
                  </div>
                ) : null}
                <Navigation
                  prevPath="/"
                  prevLabel="Home"
                  nextPath="/preview"
                  nextLabel="Preview"
                  onNext={e => {
                    this.setState({
                      email: { ...this.state.email, dirty: true }
                    });
                    if (isInvalidEmail) e.preventDefault();
                  }}
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
                <h2>Send</h2>
                <Sender
                  {...progress}
                  onSentCountChange={this.handleSentCountChange}
                  onRestart={this.handleRestart}
                />
              </div>
            )}
          />
        </Switch>
      </Router>
    );
  }
}
export default App;
