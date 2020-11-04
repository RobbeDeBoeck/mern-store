import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UnAuthRoute({ Component, ...rest }) {
  const { isLoggedIn } = useAuth();
  return <Route {...rest} render={props => (!isLoggedIn() ? <Component {...props} /> : <Redirect to="/" />)} />;
}
