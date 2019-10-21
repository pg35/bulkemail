import React from "react";
import { MemoryRouter as Router } from "react-router";
import { Route, Switch } from "react-router-dom";

import HomePage from "./HomePage";
import Composer from "./Composer";
import Previewer from "./Previewer";
import Sender from "./Sender";
import Navigation from "./Navigation";
import JsonRequest from "./JsonRequest";
import Highlight from "./Highlight";

import { resources, plural } from "../util";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initCount: 0,
      isNewEmail: true,
      email: {
        postcodes: null,
        subject: "",
        message: "",
        dirty: false,
        touched: {}
      },
      progress: {
        sentCount: 0,
        customerCount: 0,
        clientId: ""
      },
      quota: {
        limit: 0,
        used: 0,
        nextRenewal: ""
      },
      nonce: "",
      emailTemplate: "",
      emailPreviewCount: 0
    };
  }

  buildEmailObj(obj) {
    let postcodes = (obj && obj.postcodes) || null;
    if (postcodes)
      postcodes = postcodes.split(",").map(x => ({ label: x, value: x }));
    //console.log("fetched postcd", postcodes);
    return {
      postcodes,
      subject: (obj && obj.subject) || "",
      message: (obj && obj.message) || "",
      dirty: !!obj,
      touched: {}
    };
  }

  buildProgressObj(obj) {
    return {
      sentCount: (obj && obj.sentCount) || 0,
      customerCount: (obj && obj.customerCount) || 0,
      clientId: (obj && obj.clientId) || Math.floor(Date.now() / 1000)
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
      email: {
        ...this.state.email,
        [name]: value,
        dirty: true,
        touched: { ...this.state.email.touched, [name]: 1 }
      },
      progress: {
        ...this.state.progress,
        customerCount: 0
      }
    });
  };

  handlePostcodeChange = selectedOptionsData => {
    this.setState({
      email: {
        ...this.state.email,
        postcodes: selectedOptionsData,
        dirty: true,
        touched: { ...this.state.email.touched, postcodes: 1 }
      },
      progress: {
        ...this.state.progress,
        customerCount: 0
      }
    });
  };

  handleSentCountChange = newCount => {
    this.setState({
      progress: { ...this.state.progress, sentCount: newCount }
    });
  };

  handlerPreviewGenerate = data => {
    const obj = {
      email: { ...this.state.email, dirty: false }
    };
    if (this.state.isNewEmail) {
      obj["progress"] = {
        ...this.state.progress,
        customerCount: data.customerCount
      };
    }
    this.setState(obj);
  };

  handleRestart = () =>
    this.setState(prevState => ({ initCount: prevState.initCount + 1 }));

  handleEmailPreviewUpdate = () =>
    this.setState(prevState => ({
      emailPreviewCount: prevState.emailPreviewCount + 1
    }));

  renderInitRequest() {
    return (
      <JsonRequest
        data={{ action: "mesbulkemailerinit" }}
        resource={resources.error.custom && resources.app.hasSavedEmail}
        progressMessage={
          !this.state.initCount ? "Initializing App" : "Fetching status"
        }
        onSuccess={obj => {
          //console.log("app::", obj);
          this.setState(prevState => ({
            initCount: prevState.initCount + 1,
            isNewEmail: !obj.savedEmail,
            email: this.buildEmailObj(obj.savedEmail),
            progress: this.buildProgressObj(obj.savedEmail),
            quota: obj.quota,
            nonce: obj.nonce,
            emailTemplate: obj.emailTemplate
          }));
        }}
        onComplete={() => "app oncomplete called"}
      />
    );
  }

  componentWillUnmount() {
    //console.log("app: unmounting");
  }

  render() {
    //console.log("app state", this.state);
    const {
      initCount,
      isNewEmail,
      email,
      progress,
      quota,
      nonce,
      emailTemplate,
      emailPreviewCount
    } = this.state;
    const emailValidation = Object.keys(email)
      .filter(p => "dirty" !== p && "touched" !== p)
      .reduce(
        (o, p) => ({
          ...o,
          [p]:
            email[p] &&
            (Array.isArray(email[p])
              ? !!email[p].length
              : !!String(email[p]).trim())
        }),
        {}
      );
    const isInvalidEmail = Object.keys(emailValidation).filter(
      p => !emailValidation[p]
    ).length;
    //console.log(emailValidation, isInvalidEmail);
    return !(initCount % 2) ? (
      <div className="mes-hvcenter">{this.renderInitRequest()}</div>
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
                nonce={nonce}
                clientId={progress.clientId}
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
                  onPostcodeChange={this.handlePostcodeChange}
                  emailTemplate={emailTemplate}
                  onEmailPreviewUpdate={this.handleEmailPreviewUpdate}
                  emailPreviewCount={emailPreviewCount}
                />
                <Navigation
                  prevPath="/"
                  prevLabel="Home"
                  nextPath="/preview"
                  nextLabel="Review"
                  onNext={e => {
                    const dirty = this.state.email.dirty;
                    this.setState({
                      email: {
                        ...this.state.email,
                        dirty: true,
                        touched: { postcodes: 1, subject: 1, message: 1 }
                      }
                    });
                    if (isInvalidEmail) e.preventDefault();
                    else {
                      this.setState({
                        email: { ...this.state.email, dirty, touched: {} }
                      });
                    }
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
                <Previewer
                  {...this.state}
                  onPreviewGenerate={this.handlerPreviewGenerate}
                />
                <Navigation
                  prevPath={isNewEmail ? "/compose" : "/"}
                  prevLabel={isNewEmail ? "Compose" : "Home"}
                  nextPath={progress.customerCount ? "/process" : false}
                  nextLabel="Confirm & Send"
                  onNext={e => {
                    if (!window.confirm(`Are you sure to send this email?`))
                      e.preventDefault();
                  }}
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
                <p>
                  <small>having</small> subject{" "}
                  <Highlight v={this.state.email.subject} />
                </p>
                <p>
                  <small>to</small>{" "}
                  {plural(
                    this.state.email.postcodes.length,
                    "postcodes",
                    "postcode"
                  )}{" "}
                  <Highlight
                    v={this.state.email.postcodes
                      .filter(o => "*" !== o.value)
                      .map(o => o.value)}
                  />
                </p>
                <Sender
                  {...this.state}
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
