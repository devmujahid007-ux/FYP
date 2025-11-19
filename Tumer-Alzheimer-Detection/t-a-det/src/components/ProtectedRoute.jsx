// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth";

export default function ProtectedRoute({ children, allow = [] }) {
  const { user } = useAuth();
  const location = useLocation();

  // not logged in: kick to /login with state
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // logged in but wrong role
  if (allow.length && !allow.includes(user.role)) {
    // send them to their own dashboard if possible
    const fallback =
      user.role === "Admin" ? "/admin-dashboard" :
      user.role === "Doctor" ? "/doctor-dashboard" :
      "/patient-dashboard";
    return <Navigate to={fallback} replace />;
  }

  return children;
}
