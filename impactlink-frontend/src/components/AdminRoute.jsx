import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  // Admin tokens are stored separately from user tokens
  const adminToken = localStorage.getItem("adminToken");

  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
