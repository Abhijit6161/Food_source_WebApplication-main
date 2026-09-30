import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const AdminRoute = () => {
  const { user, loading, isAdmin } = useContext(AuthContext);

  if (loading) {
    return <LoadingSpinner message="Checking admin permissions..." />;
  }

  return user && isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
