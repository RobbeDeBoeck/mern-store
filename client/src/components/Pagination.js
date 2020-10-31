import React from "react";
import { PropTypes } from "prop-types";

export default function Pagination({ current, pageAmount, onClick }) {
  const pageNumbers = [...Array(pageAmount).keys()].map(p => p + 1);
  const start = current > 1 ? current - 2 : current - 1;

  return (
    <div className="flex">
      <button className={`rounded-l pagination-button border-r-0`} disabled={current <= 1} onClick={() => onClick(current - 1)}>
        &lt;
      </button>
      {pageNumbers.slice(start, start + 3).map(pageNumber => (
        <button className={`pagination-button border-r-0`} key={pageNumber} onClick={() => onClick(pageNumber)}>
          {pageNumber}
        </button>
      ))}
      <button className={`rounded-r pagination-button`} disabled={current >= pageAmount} onClick={() => onClick(current + 1)}>
        &gt;
      </button>
    </div>
  );
}

Pagination.propTypes = {
  current: PropTypes.number.isRequired,
  pageAmount: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};
