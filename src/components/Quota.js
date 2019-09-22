import React from "react";

function Quota(props) {
  return (
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
            <td>{props.limit}</td>
          </tr>
          <tr>
            <th>Remaining</th>
            <td>{props.limit - props.used}</td>
          </tr>
          <tr>
            <th>Next Renewal</th>
            <td>{props.nextRenewal}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Quota;
