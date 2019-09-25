import React from "react";
import "whatwg-fetch";
import Highlight from "./Highlight";

function buildQueryString(params) {
  if (!params) return "";
  const keys = Object.keys(params);
  return keys.length
    ? "?" +
        keys
          .map(
            key =>
              encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
          )
          .join("&")
    : "";
}
function throwError(msg, data) {
  var error = new Error(msg);
  error.data = data;
  throw error;
}

class JsonRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      error: null
    };
  }

  fetch() {
    const {
      baseUrl,
      resource,
      method,
      data,
      onSuccess,
      onError,
      onComplete,
      onValidateResponse
    } = this.props;
    const url = baseUrl + (resource ? "/" + resource : "");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    this.setState({ fetching: true, error: null });
    console.info(url, resource, method, data, url + buildQueryString(data));
    const promise =
      !method || "GET" === method
        ? fetch(url + buildQueryString(data))
        : fetch(url, options);
    promise
      .then(response => {
        console.log(response);
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throwError(response.statusText, response);
        }
      })
      .then(json => {
        if (onValidateResponse && !onValidateResponse(json)) {
          throwError(json.errMsg ? json.errMsg : "Invalid response", json);
        }
        onSuccess && onSuccess(json);
      })
      .catch(error => {
        this.setState({ error });
        onError && onError(error);
      })
      .finally(() => {
        if (this.mounted) {
          this.setState({ fetching: false });
          onComplete && onComplete();
        }
      });
  }

  componentDidMount() {
    this.fetch();
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  render() {
    if (this.state.fetching) {
      return (
        <div>
          {this.props.progressMessage} ...{" "}
          <img
            style={{ lineHeight: "1em", verticalAlign: "middle" }}
            src="https://i.ibb.co/7V89Rtr/spinner.gif"
            alt="loader gif"
          />
        </div>
      );
    }
    if (this.state.error) {
      const { error } = this.state;
      console.log("a", error.message, error.name);
      let detail = error.message;
      if (!detail && error.response) {
        detail = error.response.status + " " + error.response.statusText;
      }
      return (
        <div>
          <Highlight v={`Failed: ${this.props.progressMessage} `} />
          {detail ? `(${detail}) ` : " "}
          <button
            onClick={() => {
              this.fetch();
              this.props.onRetry();
            }}
          >
            Retry
          </button>
        </div>
      );
    }
    return null;
  }
}
JsonRequest.defaultProps = {
  onValidateResponse: json => !json.err,
  baseUrl: "https://www.mocky.io/v2"
  //data: { "mocky-delay": "5000ms" }
};
export default JsonRequest;
