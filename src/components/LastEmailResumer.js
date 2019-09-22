import React from "react";
import Highlight from "./Highlight";
import { Link } from "react-router-dom";

function SavedEmailHandler(props) {
  console.log("lastemalresumer", props);
  const renderLastEmailInfo = () => {
    const { postcode, sentCount, customerCount } = props.savedEmail;
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
          Send it now or delete it.
        </div>
        <div style={{ marginTop: "20px" }}>
          <Link
            to="/"
            onClick={e => {
              console.log("link clicked");
              props.onSavedEmailDelete();
            }}
          >
            Delete Saved Email
          </Link>
          &nbsp;&nbsp;&nbsp;
          <Link to="/preview">Preview Saved Email</Link>
        </div>
      </div>
    );
  };

  const element = props.savedEmail ? (
    renderLastEmailInfo()
  ) : (
    <Link to="/compose">Compose Email</Link>
  );
  return <div>{element}</div>;
}

export default SavedEmailHandler;
