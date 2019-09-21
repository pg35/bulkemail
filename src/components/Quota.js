import React from "react";
import JsonRequest from "./JsonRequest";

class Quota extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      limit: 0,
      used: 0,
      nextRenewal: ""
    };
  }

  renderJsonRequest() {
    return (
      <JsonRequest
        data={{ "mocky-delay": "500ms" }}
        baseUrl="https://www.mocky.io/v2/5d857913320000410f07b267"
        label="quota"
        onSuccess={obj => {
          console.log(obj);
          this.setState({
            limit: obj.limit,
            used: obj.used,
            nextRenewal: obj.nextRenewal
          });
        }}
        onComplete={() =>
          this.setState({
            loading: false
          })
        }
        validateResponse={json => json.err}
      />
    );
  }

  render() {
    console.log(this.state.loading, this.props.refresh);
    const element =
      this.state.loading || this.props.refresh ? (
        this.renderJsonRequest()
      ) : (
        <table>
          <tbody>
            <tr>
              <th colSpan="2" style={{ textAlign: "center" }}>
                Quota
              </th>
            </tr>
            <tr>
              <th>Limit</th>
              <td>{this.state.limit}</td>
            </tr>
            <tr>
              <th>Remaining</th>
              <td>{this.state.limit - this.state.used}</td>
            </tr>
            <tr>
              <th>Next Renewal</th>
              <td>{this.state.nextRenewal}</td>
            </tr>
          </tbody>
        </table>
      );
    return <div style={{ border: "solid" }}>{element}</div>;
  }
}

export default Quota;
