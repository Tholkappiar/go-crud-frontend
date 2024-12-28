import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectUserData } from '../slice/userSelectors';
import { useUserSlice } from '../slice/userSlice';
import { useBlogSlice } from '../slice/blogSlice';

const RequireAuth = () => {
  useUserSlice();
  useBlogSlice();
  let { jwt, user_id } = useSelector(selectUserData);

  if (!jwt || !user_id) {
    jwt = localStorage.getItem('jwt');
    user_id = localStorage.getItem('userID');
  }

  if (!jwt || !user_id) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default RequireAuth;
