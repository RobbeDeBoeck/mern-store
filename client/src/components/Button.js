import React from "react";
import { PropTypes } from "prop-types";

export default function Button({ children, className, transparent, round, onClick }) {
  function getClass() {
    let classes = "";
    if (transparent) classes += " bg-transparent";
    else classes += " primary";

    if (round) classes += " rounded-full";
    else classes += " rounded";

    return classes;
  }

  return (
    <button className={`btn ${className || ""} ${getClass()}`} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  transparent: PropTypes.bool,
  round: PropTypes.bool,
  onClick: PropTypes.func,
};
