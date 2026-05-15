import React, { useState } from 'react';
import './Auth.css';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass-panel" style={{ maxWidth: '600px' }}>
        <div className="auth-header">
          <h1 className="auth-title">Contact Us</h1>
          <p className="auth-subtitle">We'd love to hear from you</p>
        </div>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--success)' }}>
            <h2>Message Sent Successfully!</h2>
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Thank you for reaching out. We will get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input type="text" className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea className="form-input" rows="5" required></textarea>
            </div>
            <button type="submit" className="btn-primary">Send Message</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
