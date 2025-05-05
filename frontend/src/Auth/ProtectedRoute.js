import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Save the attempted URL for redirecting after login
    return <Navigate to="/SignIn" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;