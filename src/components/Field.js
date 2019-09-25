import React from "react";

function Field(props) {
  const { isValid, invalidMsg } = props;
  return (
    <div className={`mes-field ${isValid ? "" : "mes-field--error"}`}>
      <div>{props.children}</div>
      {isValid ? null : <div className="mes-error">{invalidMsg}</div>}
    </div>
  );
}

Field.defaultProps = {
  invalidMsg: "required"
};
export default Field;
