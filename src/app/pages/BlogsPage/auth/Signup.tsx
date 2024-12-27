import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import '../styles/Signup.css';
import { Link, useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  api?: string;
}

function Signup() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const response = await axios.post<{ message: string }>(
        'http://localhost:8080/user/register',
        {
          email: formData.email,
          password: formData.password,
        },
      );
      setSuccessMessage(
        response.data.message ||
          'Sign up successful! Please check your email for confirmation.',
      );

      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
      });
      if (response) {
        navigate('/login');
      }
    } catch (error: any) {
      console.error('Error:', error.response || error.message);
      setErrors({
        api:
          error.response?.data?.message ||
          'An error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          {errors.api && <p className="error">{errors.api}</p>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
          </div>

          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>

          <p className="switch-link">
            Already have an account? <Link to={'/login'}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
