import React, { useState, useCallback, useEffect } from 'react';
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserActions, useUserSlice } from '../slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserData,
  selectUserIsLoading,
  selectUserRequestStatus,
} from '../slice/userSelectors';

function Login() {
  useUserSlice();

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = useCallback(e => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const isLoading = useSelector(selectUserIsLoading);
  const requestStatus = useSelector(selectUserRequestStatus);

  const user = useSelector(selectUserData);

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(UserActions.loginUser(userData));
  };

  useEffect(() => {
    if (!isLoading && requestStatus) {
      localStorage.setItem('jwt', user.jwt);
      localStorage.setItem('userID', user.user_id);
      navigate('/blogs');
    }
  }, [isLoading, requestStatus, user, navigate]);

  if (isLoading) return <p>Loading ...</p>;

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={userData.email}
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={userData.password}
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
