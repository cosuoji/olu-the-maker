import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../../store/useUserStore";

const ProtectedRoute = ({ adminOnly = false }) => {
  const { user, isAuthenticated, loading } = useUserStore();

  if (loading)
    return (
      <div className="p-20 font-serif italic opacity-50">
        Checking credentials...
      </div>
    );

  // 1. Not logged in? Send them to the Auth page.
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // 2. Logged in, but trying to access an Admin route without being an admin? Send them home.
  if (adminOnly && user?.user?.isAdmin !== true) {
    return <Navigate to="/" replace />;
  }

  // 3. If they pass the checks, render the requested page (Outlet).
  return <Outlet />;
};

export default ProtectedRoute;
