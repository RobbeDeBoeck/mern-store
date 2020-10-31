import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

import Button from "./Button";

import { CART } from "../config/config";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  const { _id, name, price, image } = product;
  const imageStyle = {
    backgroundImage: `url('${image}')`,
  };

  function onAddItem() {
    addItem({ ...product, qty: 1 });
  }

  return (
    <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden bg-white">
      <div className="flex items-end justify-end h-56 w-full bg-cover" style={imageStyle}>
        <Button round className="mx-5 -mb-4" onClick={onAddItem}>
          <svg
            className="h-5 w-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d={CART}></path>
          </svg>
        </Button>
      </div>
      <div className="px-5 py-3">
        <Link to={`/product/${_id}`} className="text-gray-700 uppercase block">
          {name}
        </Link>
        <span className="text-gray-500 mt-2">€ {price}</span>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
  }).isRequired,
};
