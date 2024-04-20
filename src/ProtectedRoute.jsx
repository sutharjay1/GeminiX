import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children, user, redirect = '/login' }) => {
  if (!user) {
    return (
      <Navigate
        to={redirect}
        replace
      />
    );
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
