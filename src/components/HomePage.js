import React from "react";

import Quota from "./Quota";
import LastEmailResumer from "./LastEmailResumer";

function HomePage(props) {
  console.log("homepage ", props);
  return (
    <div id="mesblkml-home">
      <h2>Home</h2>
      <Quota {...props.quota} />
      <br />
      <LastEmailResumer {...props} />
    </div>
  );
}

export default HomePage;
