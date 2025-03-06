import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Example: Retrieve user data
  const isAdmin = user?.role === "admin"; // Check if user is an admin

  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
