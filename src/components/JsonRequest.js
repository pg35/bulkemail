import React from "react";
import "whatwg-fetch";

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
      validateResponse
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
        if (validateResponse && !validateResponse(json)) {
          throwError(json.errMsg ? json.errMsg : "Invalid response", json);
        }
        onSuccess && onSuccess(json);
      })
      .catch(error => {
        this.setState({ error });
        onError && onError(error);
      })
      .finally(() => {
        this.setState({ fetching: false });
        onComplete && onComplete();
      });
  }

  componentDidMount() {
    this.fetch();
  }

  render() {
    if (this.state.fetching) {
      return (
        <div>
          Feting {this.props.label} ...{" "}
          <img
            style={{ verticalAlign: "bottom" }}
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
          <div>Failed to fetch {this.props.label}. </div>
          <div>{detail}</div>
          <button onClick={() => this.fetch()}>Retry</button>
        </div>
      );
    }
    return null;
  }
}
JsonRequest.defaultProps = {
  baseUrl: "https://reqres.in/api/users"
};
export default JsonRequest;
