import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

import Button from "./Button";

import { MINUS, PLUS, CLOSE, MAX_QTY } from "../config/config";
import { roundPrice } from "../config/functions";
import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { updateItem, deleteItem } = useCart();
  const { _id, name, image, price, qty } = item;

  return (
    <tr>
      <td className="hidden pb-4 md:table-cell">
        <Link to={`/product/${_id}`}>
          <img src={image} className="h-20 w-20 rounded" alt="" />
        </Link>
      </td>
      <td>
        <Link to={`/product/${_id}`}>
          <p>{name}</p>
        </Link>
      </td>
      <td>
        <div className="flex justify-center">
          <button className="text-gray-500 focus:outline-none focus:text-gray-600" onClick={() => updateItem(_id, qty > 1 ? qty - 1 : 1)}>
            <svg
              className="h-5 w-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d={MINUS}></path>
            </svg>
          </button>
          <span className="text-gray-700 text-lg mx-2">{qty}</span>
          <button
            className="text-gray-500 focus:outline-none focus:text-gray-600"
            onClick={() => updateItem(_id, qty < MAX_QTY ? qty + 1 : MAX_QTY)}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d={PLUS}></path>
            </svg>
          </button>
        </div>
      </td>
      <td className="hidden text-right md:table-cell">
        <span className="text-sm lg:text-base font-medium">€ {price}</span>
      </td>
      <td className="text-right">
        <span className="text-sm lg:text-base font-medium">€ {roundPrice(price * qty)}</span>
      </td>
      <td className="text-right">
        <Button round onClick={() => deleteItem(_id)}>
          <svg className="h-4 w-4 text-white fill-current" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d={CLOSE} />
          </svg>
        </Button>
      </td>
    </tr>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    qty: PropTypes.number,
  }).isRequired,
};
