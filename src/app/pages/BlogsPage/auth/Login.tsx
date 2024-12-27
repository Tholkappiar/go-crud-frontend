import React, { useState } from 'react';
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8080/user/login',
        userData,
      );
      if (response) {
        console.log(response);
        const jwt = response.data?.session?.access_token;
        const userid = response.data?.session?.user?.id;

        localStorage.setItem('jwt', jwt);
        localStorage.setItem('userId', userid);
        navigate('/blogs');
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in');
    }
  };

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
