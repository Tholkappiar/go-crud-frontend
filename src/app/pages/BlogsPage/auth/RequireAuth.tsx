import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectUserData } from '../slice/userSelectors';

const RequireAuth = () => {
  const { jwt, user_id } = useSelector(selectUserData);

  if (!jwt || !user_id) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default RequireAuth;
