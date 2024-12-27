import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
  const jwt = localStorage.getItem('jwt');
  const userid = localStorage.getItem('userid');

  if (!jwt || !userid) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default RequireAuth;
