import React from 'react';
import './Auth.css';

const About = () => {
  return (
    <div className="auth-container">
      <div className="auth-card glass-panel" style={{ maxWidth: '800px', margin: '2rem auto' }}>
        <h1 className="auth-title">About Cryptocurrency Dashboard</h1>
        <div style={{ marginTop: '2rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          <p>
            Welcome to the Cryptocurrency Dashboard, your premier destination for real-time cryptocurrency tracking and portfolio management. Built as a comprehensive Group Q project, our goal is to deliver a professional, intuitive, and feature-rich platform tailored for crypto enthusiasts and investors.
          </p>
          
          <h3 style={{ marginTop: '2rem', color: 'var(--text-primary)' }}>Our Core Features</h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '1rem' }}>
            <li>Real-time market data powered by the CoinGecko API</li>
            <li>Interactive and responsive historical price charts</li>
            <li>Secure local portfolio tracking and watchlist management</li>
            <li>Dynamic dark/light mode toggle with stored preferences</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
