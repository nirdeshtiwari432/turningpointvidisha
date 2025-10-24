import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/dashboard`, {
          method: "GET",
          credentials: "include", // send cookies/session
        });
        const data = await res.json();
        setIsAdmin(res.ok && data.success);
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <p className="text-center my-4">Checking authentication...</p>;

  if (!isAdmin) return <Navigate to="/login" replace />; // redirect if not logged in

  return children; // render protected component
};

export default ProtectedRoute;
