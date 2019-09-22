import React from "react";
import JsonRequest from "./JsonRequest";
import { resources } from "../mockapi";

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
        resource={resources.quota.pass}
        progressMessage="Fetching quota"
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
        validateResponse={json => !json.err}
      />
    );
  }

  render() {
    console.log(this.state.loading, this.props.refresh);
    const element =
      this.state.loading || this.props.refresh ? (
        this.renderJsonRequest()
      ) : (
        <div className="mesblkml-quota">
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
        </div>
      );
    return <div>{element}</div>;
  }
}

export default Quota;
