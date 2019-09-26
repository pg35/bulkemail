import React from "react";

function Highlight(props) {
  const item = Array.isArray(props.v) ? (
    props.v.map((x, i) => (
      <span key={i}>
        <strong>{x}</strong>
        {props.v.length - 1 !== i ? ", " : ""}
      </span>
    ))
  ) : (
    <strong>{props.v}</strong>
  );
  return item;
}

export default Highlight;
