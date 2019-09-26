import React from "react";

import Quota from "./Quota";
import SavedEmailHandler from "./SavedEmailHandler";

function HomePage(props) {
  console.log("homepage ", props);
  return (
    <div id="mesblkml-home">
      <h2>Bulk Email</h2>
      <p>
        Send email to postcode to have it sent to all Woocommerce customers
        having the same billing postcode
      </p>
      <Quota {...props.quota} />
      <br />
      <SavedEmailHandler {...props} />
    </div>
  );
}

export default HomePage;
