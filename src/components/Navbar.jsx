import React from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import './Navbar.css';
import toggle_light from '../assets/night.png';
import toggle_dark from '../assets/day.png';

const Navbar = ({ theme, setTheme }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate(); /* for logout */

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/map', label: 'Crime Map' },
    { path: '/cases', label: 'Cases' },
    { path: '/statistics', label: 'Statistics' },
    { path: '/pending-cases', label: 'Pending Cases' },
  ];

  const toggleMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

   const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-container">
        {/* 🛡️ Text-Based Brand Logo */}
        <Link to="/" className="navbar-brand">
          🛡️ CrimeTracker
        </Link>

        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={isActive(link.path) ? 'active' : ''}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar-auth">
          {user ? (
            <>
              <div className="navbar-user-info">
                <span>👤 {user.name}</span>
                {/* <span className="navbar-user-role">{user.role}</span> */}
              </div>
              <button onClick={logout} className="navbar-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          )}
        </div>

        <img
          onClick={toggleMode}
          src={theme === 'light' ? toggle_light : toggle_dark}
          alt="toggle icon"
          className="toggle-icon"
          style={{ cursor: 'pointer' }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
