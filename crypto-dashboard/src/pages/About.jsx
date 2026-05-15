import React from 'react';
import './Auth.css';

const About = () => {
  return (
    <div className="auth-container">
      <div className="auth-card glass-panel" style={{ maxWidth: '800px' }}>
        <h1 className="auth-title">About CryptoDash</h1>
        <div style={{ marginTop: '2rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          <p>Welcome to CryptoDash, your premier destination for real-time cryptocurrency tracking and portfolio management. Built as a Group Q project, we aimed to deliver a professional, intuitive, and feature-rich platform for crypto enthusiasts.</p>
          <h3 style={{ marginTop: '1.5rem', color: 'var(--text-primary)' }}>Our Features</h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '1rem' }}>
            <li>Real-time market data powered by CoinGecko API</li>
            <li>Interactive and responsive price charts</li>
            <li>Secure local portfolio management</li>
            <li>Beautiful Dark/Light mode UI</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
