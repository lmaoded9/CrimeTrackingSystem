import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../CSS/AuthForm.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    state: ''
  });
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    const registrationData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: 'citizen',
      location: { city: formData.city, state: formData.state }
    };

    const success = await register(registrationData);
    if (success) {
      navigate('/login');
    } else {
      setError('Registration failed. The email may already be in use.');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <header className="auth-header">
          <Shield className="auth-icon" size={48} />
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              placeholder="you@example.com"
            />
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                required
                value={formData.city}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., Mumbai"
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                id="state"
                name="state"
                type="text"
                required
                value={formData.state}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., Maharashtra"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Create a password (min. 6 characters)"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Confirm your password"
            />
          </div>
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
