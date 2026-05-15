import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, User, LogOut } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Crypto<span className="text-accent">Dash</span>
        </Link>
        <div className="navbar-links">
          <Link to="/">Dashboard</Link>
          <Link to="/market">Market</Link>
          {user && <Link to="/portfolio">Portfolio</Link>}
        </div>
        <div className="navbar-actions">
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {user ? (
            <div className="user-menu">
              <Link to="/profile" className="icon-link"><User size={20} /></Link>
              <button onClick={logout} className="icon-link"><LogOut size={20} /></button>
            </div>
          ) : (
            <Link to="/login" className="btn-login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
