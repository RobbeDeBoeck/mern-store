import React from "react";
import { PropTypes } from "prop-types";

export default function Loader({ show }) {
  return (
    show && (
      <div className="loader-container">
        <div className="centered">
          <div className="loader"></div>
        </div>
      </div>
    )
  );
}

Loader.propTypes = {
  show: PropTypes.bool,
};
