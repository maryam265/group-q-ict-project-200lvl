import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const NotFound = () => {
  return (
    <div className="auth-container">
      <div className="auth-card glass-panel" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', color: 'var(--accent-primary)', marginBottom: '1rem' }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Page Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-primary" style={{ display: 'inline-block', width: 'auto' }}>Go to Dashboard</Link>
      </div>
    </div>
  );
};

export default NotFound;
