import React from "react";
import spinnerPath from "../spinner.gif";
import Highlight from "./Highlight";

export function buildQueryString(params) {
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

export function throwError(msg, data) {
  var error = new Error(msg);
  error.data = data;
  throw error;
}

export function error2Msg(error) {
  let detail = error.message;
  if (!detail && error.response) {
    detail = error.response.status + " " + error.response.statusText;
  }
  return detail;
}

export function RequestProgress(props) {
  return (
    <div>
      {props.message} {"..."} <img src={spinnerPath} alt="loader gif" />
    </div>
  );
}

export function RequestError(props) {
  const { error, showRetry, onRetry } = props;
  return (
    <div>
      <Highlight v={error2Msg(error)} />{" "}
      {showRetry && <button onClick={e => onRetry()}>Retry</button>}
    </div>
  );
}

export const requestConfig = {
  baseUrl: "",
  method: "GET",
  defaultHeaders: {
    "Content-Type": "application/json"
  },
  progressMessage: "Fetching",
  getUrl: (props, config) => config.baseUrl,
  getPayload: (props, config) => {},
  getHeaders: (props, config) => config.defaultHeaders,
  formatPayload: (payload, method, config) =>
    "GET" === method ? buildQueryString(payload) : JSON.stringify(payload),
  fetch: (url, method, headers, payload, config) => {
    const promise =
      "GET" === method
        ? fetch(url + payload)
        : fetch(url, {
            method,
            headers,
            body: payload
          });
    return promise.then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        throwError(response.statusText, response);
      }
    });
  },
  onSuccess: (response, props, config) => console.log("onSuccess", response),
  onError: (error, props, config) => console.log("error", error)
};

const withRequest = (config = requestConfig) => Component => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        fetching: false,
        error: null,
        response: null
      };
    }

    handleRetry = () => this.fetch();
    fetch() {
      const url = config.getUrl(this.props, config);
      const payload = config.formatPayload(
        config.getPayload(this.props, config)
      );
      const headers = config.getHeaders(this.props, config);
      this.setState({ fetching: true, error: null });
      console.info(url, payload, config);
      const promise = config.fetch(
        url,
        config.method,
        headers,
        payload,
        config
      );
      promise
        .then(response => {
          config.onSuccess(response, this.props, config);
          this.setState({ response });
        })
        .catch(error => {
          config.onError(error, this.props);
          this.setState({ error });
        })
        .finally(() => {
          this.setState({ fetching: false });
        });
    }

    componentDidMount() {
      this.fetch();
    }

    render() {
      if (this.state.fetching) {
        return <RequestProgress message={config.progressMessage} />;
      }
      if (this.state.error) {
        const { error } = this.state;
        return (
          <RequestError
            error={error}
            onRetry={this.handleRetry}
            showRetry={true}
          />
        );
      }
      return <Component {...this.props} data={this.state.response} />;
    }
  };
};

export default withRequest;
