// src/auth.js
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("currentUser");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("currentUser", JSON.stringify(user));
    else localStorage.removeItem("currentUser");
  }, [user]);

  const login = (email, password) => {
    // very simple local auth against users created during Register
    const all = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const match = all.find(u => u.email === email && u.password === password);
    if (match) {
      setUser({ role: match.role, email: match.email, name: match.fullName || match.name || "User" });
      return { ok: true, user: match };
    }
    return { ok: false, error: "Invalid credentials" };
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, login, logout, setUser }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
