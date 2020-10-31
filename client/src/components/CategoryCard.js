import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

import Button from "./Button";

export default function CategoryCard({ category, half }) {
  const { _id, name, description, image } = category;

  return (
    <div className={`w-full md:px-4 ${half ? "md:w-1/2" : ""}`}>
      <div
        className={`h-64 w-full rounded-md overflow-hidden bg-cover bg-center mb-8`}
        style={{
          backgroundImage: `url('${image}')`,
        }}
      >
        <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
          <div className="px-10 max-w-xl">
            <h2 className="text-2xl text-white font-semibold">{name}</h2>
            <p className="mt-2 text-gray-400">{description}</p>
            <Link to={`/shop?cat=${_id}`}>
              <Button className="flex items-center mt-4 text-sm uppercase font-medium">
                <span>Shop Now</span>
                <svg
                  className="h-5 w-5 ml-2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

CategoryCard.propTypes = {
  category: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
  }),
  half: PropTypes.bool,
};
