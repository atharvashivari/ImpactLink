import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setIsAdmin(user?.role === "admin");
    } catch (error) {
      console.error("Error parsing user data:", error);
      setIsAdmin(false);
    }
  }, []);

  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
