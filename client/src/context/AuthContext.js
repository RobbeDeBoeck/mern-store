import React, { useContext, useEffect, useState } from "react";

import { API_URL } from "../config/config";
import { fetch } from "../config/functions";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) setToken(localToken);
  }, []);

  async function login(email, password) {
    try {
      const res = await fetch(API_URL + "/auth/login", { method: "POST", body: { email, password } });
      localStorage.setItem("token", res.token);
      setToken(res.token);
      return true;
    } catch (err) {
      return false;
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  function isLoggedIn() {
    return token !== null;
  }

  return <AuthContext.Provider value={{ token, login, logout, isLoggedIn }}>{children}</AuthContext.Provider>;
}
