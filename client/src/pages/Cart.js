import React from "react";

import CartItem from "../components/CartItem";

import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart } = useCart();
  return (
    <div className="container mx-auto bg-white p-6 shadow-lg rounded">
      {!cart.items.length && <h1 className="text-center text-4xl">Your cart is empty</h1>}
      {Boolean(cart.items.length) && (
        <>
          <table className="w-full text-sm lg:text-base" cellSpacing="0">
            <thead>
              <tr className="h-12 uppercase">
                <th className="hidden md:table-cell"></th>
                <th className="text-left">Product</th>
                <th className="text-center">Quantity</th>
                <th className="hidden text-right md:table-cell">Unit price</th>
                <th className="text-right">Total price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map(i => (
                <CartItem key={i._id} item={i} />
              ))}
            </tbody>
          </table>
          <hr className="pb-6 mt-6" />
          <div className="flex justify-between uppercase font-bold">
            <span>Total:</span>
            <span>€ {cart.total}</span>
          </div>
        </>
      )}
    </div>
  );
}
