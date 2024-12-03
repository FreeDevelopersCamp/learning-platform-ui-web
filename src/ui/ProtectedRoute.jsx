// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth/AuthContext';
import Spinner from './Spinner';

const ProtectedRoute = ({ children, role }) => {
  const { auth, isLoading } = useAuth();

  if (isLoading) return <Spinner>Loading session...</Spinner>;

  // If not authenticated, redirect to login
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role === 'all') return children;

  // If role doesn't match, redirect to not-authorized page
  if (role && auth.role !== role) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
