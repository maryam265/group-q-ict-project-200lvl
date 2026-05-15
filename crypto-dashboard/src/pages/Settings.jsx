import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './Auth.css';

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="auth-container">
      <div className="auth-card glass-panel">
        <h1 className="auth-title">Settings</h1>
        <div style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
            <span>Dark Mode</span>
            <button 
              onClick={toggleTheme}
              style={{
                width: '50px', height: '26px', borderRadius: '13px', 
                background: theme === 'dark' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                position: 'relative', transition: 'all 0.3s'
              }}
            >
              <div style={{
                width: '22px', height: '22px', borderRadius: '50%', background: 'white',
                position: 'absolute', top: '2px', left: theme === 'dark' ? '26px' : '2px',
                transition: 'all 0.3s'
              }}></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
