import React from "react";

import Highlight from "./Highlight";
import JsonRequest from "./JsonRequest";
import { resources, plural } from "../util";

function Previewer(props) {
  const renderPreview = () => {
    const {
      email: { postcodes, subject, message },
      progress: { sentCount, customerCount },
      quota: { limit, used },
      isNewEmail
    } = props;
    const remainingCustomers = customerCount - sentCount;
    const remainingQuota = limit - used;
    const feedback =
      remainingCustomers > remainingQuota
        ? `There is not enough quota remaining to send ${remainingCustomers} emails. Only ${remainingQuota} emails can be sent.`
        : "";
    return (
      <div>
        <div className="mes-row">
          <div className="mes-row__heading">
            {plural(postcodes.length, "Postcodes", "Postcode")}
          </div>
          <div className="mes-row__detail">
            <Highlight
              v={postcodes.filter(o => "*" !== o.value).map(o => o.value)}
            />{" "}
            ({postcodes.length > 1 ? "all " : ""}having{" "}
            {postcodes.length > 1 ? "total " : ""}
            <Highlight v={customerCount} />{" "}
            {plural(customerCount, "customers", "customer")})
          </div>
        </div>
        <div className="mes-row">
          <div className="mes-row__heading">Subject</div>
          <div className="mes-row__detail">{subject}</div>
        </div>
        <div className="mes-row">
          <div className="mes-row__heading">Message</div>
          <div
            className="mes-row__detail"
            style={{ border: "1px dotted #000" }}
            dangerouslySetInnerHTML={{
              __html: (() => message.replace(/(?:\r\n|\r|\n)/g, "<br/>"))()
            }}
          />
        </div>
        <div className="mes-row">
          <div className="mes-row__heading">Total customers to serve</div>
          <div className="mes-row__detail">
            {customerCount}{" "}
            <small>(emails will need to be sent for selected postcodes)</small>
          </div>
        </div>
        {!isNewEmail && (
          <div className="mes-row">
            <div className="mes-row__heading">Customers already served</div>
            <div className="mes-row__detail">
              {sentCount} <small>(emails have already been sent)</small>
            </div>
          </div>
        )}
        {!isNewEmail && (
          <div className="mes-row">
            <div className="mes-row__heading">
              Customers remaining to be served
            </div>
            <div className="mes-row__detail">
              {remainingCustomers}{" "}
              <small>(emails are remaining to be sent)</small>
            </div>
          </div>
        )}
        <div className="mes-row">
          <div className="mes-row__heading">Qutoa</div>
          <div className="mes-row__detail">{limit}</div>
        </div>
        <div className="mes-row">
          <div className="mes-row__heading">Remaining Qutoa</div>
          <div className="mes-row__detail">{remainingQuota}</div>
        </div>

        <div className="mes-row" style={{ marginTop: "2em" }}>
          <small>
            <strong>Processing Info:</strong>
            <br />
            - Emails will be sent until all emails are sent, qutoa rans out or
            some unexpected error occurs.
            <br />
            - If quota is renewed during the processing, it will be consumed.
            <br />
            - If not all emails are sent, data will be saved to resume the
            processing later to send remaining emails.
            <br />
          </small>
        </div>
        {feedback && (
          <div
            className="mes-row"
            style={{
              textAlign: "center",
              fontSize: "1.2em",
              marginTop: "2em",
              color: "#cc3300",
              fontWeight: "bold"
            }}
          >
            {feedback}
          </div>
        )}
      </div>
    );
  };

  const renderGenerateRequest = () => {
    return (
      <JsonRequest
        resource={resources.error.code500 && resources.previewer.pass}
        progressMessage="Generating preview"
        onSuccess={obj => {
          console.log("preview::", obj);
          props.onPreviewGenerate(obj);
        }}
      />
    );
  };

  const element = props.email.dirty ? (
    <div className="mes-hvcenter">{renderGenerateRequest()}</div>
  ) : (
    renderPreview()
  );
  return <div>{element}</div>;
}
export default Previewer;
