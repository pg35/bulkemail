import React from "react";
import { Link } from "react-router-dom";

function Navigation(props) {
  const { prevPath, prevLabel, onPrev, nextPath, nextLabel, onNext } = props;
  const noop = () => {};
  return (
    <div>
      {prevPath ? (
        <Link to={prevPath} onClick={onPrev ? onPrev : noop}>
          {prevLabel ? prevLabel : "Previous"}
        </Link>
      ) : null}
      {nextPath ? (
        <Link to={nextPath} onClick={onNext ? onNext : noop}>
          {nextLabel ? nextLabel : "Next"}
        </Link>
      ) : null}
    </div>
  );
}

export default Navigation;
