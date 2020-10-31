import React from "react";

import Login from "../components/Login";
import Register from "../components/Register";

export default function Auth() {
  return (
    <div className=" container mx-auto grid gap-10 grid-cols-2">
      <Login />
      <Register />
    </div>
  );
}
