import React from "react";
import { PropTypes } from "prop-types";

import { CLOSE } from "../config/config";

export default function Alert({ children, show, danger, success, onClose }) {
  function getClass() {
    if (danger) return "danger";
    else return "success";
  }

  return (
    show && (
      <div className={`alert ${getClass()}`} role="alert">
        {children}
        <span className="close" onClick={onClose}>
          <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d={CLOSE} />
          </svg>
        </span>
      </div>
    )
  );
}

Alert.propTypes = {
  show: PropTypes.bool,
  danger: PropTypes.bool,
  success: PropTypes.bool,
  onClose: PropTypes.func,
};
