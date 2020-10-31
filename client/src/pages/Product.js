import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Alert from "../components/Alert";
import Button from "../components/Button";
import Loader from "../components/Loader";

import { API_URL, MAX_QTY, MINUS, PLUS } from "../config/config";
import { fetch } from "../config/functions";
import { useCart } from "../context/CartContext";

export default function Product() {
  const { addItem } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${API_URL}products/${id}`);
        setProduct(res);
      } catch (err) {
        const res = err.response;
        setError(`${res.status} - ${res.statusText}`);
      }
    }
    setLoading(true);
    fetchProduct();
    setLoading(false);
  }, [id]);

  function increment() {
    setQty(currQty => (currQty < MAX_QTY ? currQty + 1 : currQty));
  }

  function decrement() {
    setQty(currQty => (currQty > 1 ? currQty - 1 : currQty));
  }

  function onAddItem() {
    addItem({ ...product, qty });
  }

  return (
    <>
      <Loader show={loading} />
      <Alert show={error !== null} danger onClose={() => setError(null)}>
        {error}
      </Alert>
      {product && (
        <div className="container mx-auto px-6">
          <div className="md:flex md:items-center bg-white p-6 rounded">
            <div className="w-full h-64 md:w-1/2 lg:h-96">
              <img className="h-full w-full rounded-md object-cover" src={product.image} alt="" />
            </div>
            <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
              <h3 className="text-gray-700 uppercase text-lg">{product.name}</h3>
              <span className="text-gray-500 mt-3">€ {product.price}</span>
              <hr className="my-3" />
              <div className="mt-2">
                <label className="text-gray-700 text-sm" htmlFor="count">
                  Quantity:
                </label>
                <div className="flex items-center mt-1">
                  <button className="text-gray-500 focus:outline-none focus:text-gray-600" onClick={decrement}>
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
                  <button className="text-gray-500 focus:outline-none focus:text-gray-600" onClick={increment}>
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
              </div>
              <div className="flex items-center mt-6">
                <Button className="px-8 font-medium text-sm" onClick={onAddItem}>
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
