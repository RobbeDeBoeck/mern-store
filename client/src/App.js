import React from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import About from "./pages/About";

import { BRAND_NAME } from "./config/config";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import UnAuthRoute from "./guards/UnAuthRoute";

function App() {
  document.title = BRAND_NAME;
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <main className="relative py-6">
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/shop" component={Shop} />
              <Route path="/product/:id" component={Product} />
              <Route path="/cart" component={Cart} />
              <Route path="/about" component={About} />
              <UnAuthRoute path="/auth" Component={Auth} />
              <Redirect to="/" />
            </Switch>
          </main>
          <footer className="text-center bg-gray-800 text-white p-3">&copy; {BRAND_NAME}</footer>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
