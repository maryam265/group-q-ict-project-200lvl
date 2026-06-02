import React from 'react';
import './Auth.css';

const About = () => {
  const groupMembers = [
    { name: 'MUHAMMED MARYAM MAYOWA', matric: 'LCU/UG/24/29701' },
    { name: 'OLUWADARE ISAAC OLUWAKOREDE', matric: 'LCU/UG/24/28563' },
    { name: 'OLADAYO OLUWAFERANMI TOBILOBA', matric: 'LCU/UG/24/33535' },
    { name: 'OKAFOR CHISOM CELINE', matric: 'LCU/UG/24/32815' },
    { name: 'ALBERT TEMINIOLUWA', matric: 'LCU/UG/24/29964' },
    { name: 'OLASEINDE SAMUEL OLUWATOSIN', matric: 'LCU/UG/24/30742' }
  ];

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

          <h3 style={{ marginTop: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Project Group Members (Group Q)</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '1.25rem',
            marginTop: '1rem'
          }}>
            {groupMembers.map((member, idx) => (
              <div 
                key={idx} 
                style={{ 
                  padding: '1.25rem', 
                  background: 'var(--bg-secondary)', 
                  borderRadius: '12px', 
                  border: '1px solid var(--glass-border)',
                  boxShadow: 'var(--card-shadow)',
                  textAlign: 'left'
                }}
              >
                <div style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '1rem' }}>
                  {member.name}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', marginTop: '0.25rem', fontWeight: '500' }}>
                  {member.matric}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
