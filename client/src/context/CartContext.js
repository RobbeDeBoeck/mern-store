import React, { useContext, useReducer } from "react";

import { roundPrice } from "../config/functions";

const CartContext = React.createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, { items: [], total: 0 });

  function addItem(item) {
    dispatch({ type: ACTIONS.ADD, item });
  }

  function deleteItem(id) {
    dispatch({ type: ACTIONS.DELETE, id });
  }

  function updateItem(id, qty) {
    dispatch({ type: ACTIONS.UPDATE, id, qty });
  }

  return <CartContext.Provider value={{ cart, addItem, updateItem, deleteItem }}>{children}</CartContext.Provider>;
}

const ACTIONS = {
  ADD: "ADD",
  DELETE: "DELETE",
  UPDATE: "UPDATE",
};

function reducer(state, action) {
  if (action.type === ACTIONS.ADD && !state.items.some(i => i._id === action.item._id)) {
    const items = [...state.items, action.item];
    const total = calculateTotal(items);
    return { items, total };
  }

  if (action.type === ACTIONS.DELETE) {
    const items = state.items.filter(i => i._id !== action.id);
    const total = calculateTotal(items);
    return { items, total };
  }

  if (action.type === ACTIONS.UPDATE) {
    const items = state.items.map(i => (i._id === action.id ? { ...i, qty: action.qty } : i));
    const total = calculateTotal(items);
    return { items, total };
  }

  return state;
}

function calculateTotal(items) {
  return roundPrice(items.reduce((prev, next) => prev + next.price * next.qty, 0));
}
