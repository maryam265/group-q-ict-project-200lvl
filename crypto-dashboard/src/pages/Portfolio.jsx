import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { PortfolioContext } from '../context/PortfolioContext';
import { AuthContext } from '../context/AuthContext';
import CoinCard from '../components/CoinCard';
import './Portfolio.css';

const Portfolio = () => {
  const { portfolio } = useContext(PortfolioContext);
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const totalValue = portfolio.reduce((acc, coin) => acc + (coin.current_price || 0), 0);

  return (
    <div className="portfolio-container">
      <div className="portfolio-header">
        <h1 className="page-title">Your <span className="text-accent">Portfolio</span></h1>
        <div className="portfolio-summary glass-panel">
          <div className="summary-item">
            <span className="summary-label">Total Value</span>
            <span className="summary-val">${totalValue.toLocaleString()}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Assets Count</span>
            <span className="summary-val">{portfolio.length}</span>
          </div>
        </div>
      </div>

      {portfolio.length === 0 ? (
        <div className="empty-portfolio glass-panel">
          <h2>Your portfolio is empty</h2>
          <p>Start tracking your favorite cryptocurrencies today.</p>
          <Link to="/market" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem', width: 'auto' }}>
            Explore Market
          </Link>
        </div>
      ) : (
        <div className="coins-grid">
          {portfolio.map(coin => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Portfolio;
