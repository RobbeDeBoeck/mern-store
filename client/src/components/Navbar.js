import React, { useState } from "react";
import { Link } from "react-router-dom";

import { BRAND_NAME, CART, MENU, NAV_ITEMS } from "../config/config";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  function toggleOpen() {
    setOpen(currOpen => !currOpen);
  }

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
        <div className="flex justify-between items-center">
          <div>
            <Link className="text-gray-800 text-xl font-bold md:text-2xl hover:text-gray-700" to="/">
              {BRAND_NAME}
            </Link>
          </div>
          <div className="flex md:hidden">
            <Link className="relative text-gray-700 hover:text-gray-600 mr-3" to="/cart">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d={CART} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {cart.items.length > 0 && <span className="absolute top-0 left-0 rounded-full bg-indigo-500 text-white p-1 text-xs"></span>}
            </Link>
            <button type="button" className="text-gray-700 hover:text-gray-600 focus:outline-none focus:text-gray-600" onClick={toggleOpen}>
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path fillRule="evenodd" d={MENU}></path>
              </svg>
            </button>
          </div>
        </div>

        <div className={"md:flex items-center " + (open ? "block" : "hidden")}>
          <div className="flex flex-col md:flex-row md:mx-6">
            {NAV_ITEMS.map(({ path, label }, i) => (
              <Link className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0" to={path} key={i}>
                {label}
              </Link>
            ))}
            {!isLoggedIn() && (
              <Link className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0" to="/auth">
                Login / Register
              </Link>
            )}
            {isLoggedIn() && (
              <Link
                className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0 cursor-pointer"
                to="/auth"
                onClick={logout}
              >
                Logout
              </Link>
            )}
          </div>
          <div className="hidden md:flex items-center">
            <Link className="relative text-gray-700 hover:text-gray-600 mr-3" to="/cart">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d={CART} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {cart.items.length > 0 && <span className="absolute top-0 left-0 rounded-full bg-indigo-500 p-1"></span>}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
