import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../CSS/AuthForm.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <header className="auth-header">
          <Shield className="auth-icon" size={48} />
          <h1 className="auth-title">Sign In</h1>
          <p className="auth-subtitle">
            Or <Link to="/register">create a new account</Link>
          </p>
        </header>
        <div className="info-box">
          <h3>Demo Credentials:</h3>
          <div className="info-box-content">
            <div><strong>Admin:</strong> admin@crime.gov.in / admin123</div>
            <div><strong>Police:</strong> police@patiala.gov.in / police123</div>
            <div><strong>Citizen:</strong> (Register a new account)</div>
          </div>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="you@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
