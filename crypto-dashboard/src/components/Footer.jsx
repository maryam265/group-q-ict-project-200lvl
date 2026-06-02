import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Crypto<span className="text-accent">Dashboard</span></h3>
          <p>Your premium cryptocurrency tracking dashboard. Real-time data, beautiful charts, and portfolio management.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/market">Market</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><Link to="#">Privacy Policy</Link></li>
            <li><Link to="#">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Cryptocurrency Dashboard. Group Q Project. Made for academic submission.</p>
      </div>
    </footer>
  );
};

export default Footer;
