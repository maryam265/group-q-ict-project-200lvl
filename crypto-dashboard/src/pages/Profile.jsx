import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="auth-container">
      <div className="auth-card glass-panel" style={{ textAlign: 'center' }}>
        <div className="auth-header">
          <h1 className="auth-title">Your Profile</h1>
        </div>
        <div style={{ margin: '2rem 0', fontSize: '1.2rem' }}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <button onClick={logout} className="btn-primary" style={{ background: 'var(--danger)' }}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
