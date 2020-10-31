import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "../components/Button";
import Alert from "./Alert";

import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const { login } = useAuth();
  const history = useHistory();

  function onSubmit(e) {
    e.preventDefault();
    if (!login(email, password)) {
      return setMsg("Login failed");
    }
    history.push("/");
  }

  return (
    <div>
      <form className="bg-white p-5 rounded-lg" onSubmit={onSubmit}>
        <h1 className="text-3xl text-gray-800 font-bold text-center mb-3">Login</h1>
        <label htmlFor="l-email">Email</label>
        <input
          type="email"
          value={email}
          id="l-email"
          className="form-control w-full block mb-3"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="l-password">Password</label>
        <input
          type="password"
          value={password}
          id="l-password"
          className="form-control w-full block mb-3"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <Button className="w-full">Login</Button>
      </form>
      <div className="relative mt-3">
        <Alert show={Boolean(msg)} danger onClose={() => setMsg({})}>
          {msg}
        </Alert>
      </div>
    </div>
  );
}
