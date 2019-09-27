import React from "react";

import Highlight from "./Highlight";
import JsonRequest from "./JsonRequest";
import { resources } from "../mockapi";

const plural = (c, p, s) => (c > 1 ? p : s);
class Previewer extends React.Component {
  constructor(props) {
    super(props);
  }

  renderPreview() {
    const {
      email: { postcodes, subject, message },
      progress: { customerCount }
    } = this.props;
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
            {plural(customerCount > 1, "customers", "customer")})
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
      </div>
    );
  }

  renderGenerateRequest() {
    return (
      <JsonRequest
        resource={resources.error.code500 && resources.previewer.pass}
        progressMessage="Generating preview"
        onSuccess={obj => {
          console.log("preview::", obj);
          this.props.onPreviewGenerate(obj);
        }}
      />
    );
  }
  render() {
    const element = this.props.email.dirty
      ? this.renderGenerateRequest()
      : this.renderPreview();
    return <div>{element}</div>;
  }
}
export default Previewer;
