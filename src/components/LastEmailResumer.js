import React from "react";
import Highlight from "./Highlight";
import { Link } from "react-router-dom";

function LastEmailResumer(props) {
  console.log("lastemalresumer", props);
  const renderLastEmailInfo = () => {
    const { postcode, sentCount, customerCount } = props.lastEmail;
    return (
      <div>
        <div>
          Previously, email destined for postcode <Highlight v={postcode} /> was
          sent to <Highlight v={sentCount} /> out of{" "}
          <Highlight v={customerCount} /> customers.
          <br />
          It was saved to be sent to the remaining{" "}
          <Highlight v={customerCount - sentCount} /> customers.
          <br />
          Send it now or discard it.
        </div>
        <div style={{ marginTop: "20px" }}>
          <Link
            to="/"
            onClick={e => {
              console.log("link clicked");
              props.onLastEmailDiscard();
            }}
          >
            Discard Saved Email
          </Link>
          &nbsp;&nbsp;&nbsp;
          <Link to="/preview">Preview Saved Email</Link>
        </div>
      </div>
    );
  };

  const element = props.lastEmail ? (
    renderLastEmailInfo()
  ) : (
    <Link to="/compose">Compose Email</Link>
  );
  return <div className="mesblkml-resumer">{element}</div>;
}

export default LastEmailResumer;
