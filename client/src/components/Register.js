import React, { useState } from "react";

import Alert from "./Alert";
import Button from "./Button";

import { API_URL } from "../config/config";
import { fetch } from "../config/functions";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState({});

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await fetch(API_URL + "/auth/register", { method: "POST", body: { firstName, lastName, email, password } });
      setMsg({ text: "Registration successfull" });
    } catch (err) {
      setMsg({ text: "Registration failed", danger: true });
    }
  }

  return (
    <div>
      <form className="bg-white p-5 rounded-lg" onSubmit={onSubmit}>
        <h1 className="text-3xl text-gray-800 font-bold text-center mb-3">Register</h1>
        <label htmlFor="r-fname">First name</label>
        <input
          type="text"
          value={firstName}
          id="r-fname"
          className="form-control w-full block mb-3"
          placeholder="First name"
          onChange={e => setFirstName(e.target.value)}
        />
        <label htmlFor="r-lname">Last name</label>
        <input
          type="text"
          value={lastName}
          id="l-fname"
          className="form-control w-full block mb-3"
          placeholder="Last name"
          onChange={e => setLastName(e.target.value)}
        />
        <label htmlFor="r-email">Email</label>
        <input
          type="email"
          value={email}
          id="r-email"
          className="form-control w-full block mb-3"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="r-password">Password</label>
        <input
          type="password"
          value={password}
          id="r-password"
          className="form-control w-full block mb-3"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <Button className="w-full">Register</Button>
      </form>
      <div className="relative mt-3">
        <Alert show={Boolean(msg.text)} danger={Boolean(msg.danger)} onClose={() => setMsg({})}>
          {msg.text}
        </Alert>
      </div>
    </div>
  );
}
