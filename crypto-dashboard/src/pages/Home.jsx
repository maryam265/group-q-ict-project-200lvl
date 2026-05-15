import React, { useState, useEffect } from 'react';
import { fetchTrendingCoins } from '../services/api';
import CoinCard from '../components/CoinCard';
import './Home.css';

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrending = async () => {
      try {
        const data = await fetchTrendingCoins();
        setTrending(data.coins.slice(0, 4));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getTrending();
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section text-center">
        <h1 className="hero-title">Track the Crypto Market with <span className="text-accent">Precision</span></h1>
        <p className="hero-subtitle">Real-time data, beautiful charts, and seamless portfolio management in one premium dashboard.</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card glass-panel">
          <h3>Global Market Cap</h3>
          <p className="stat-value">$2.4T</p>
          <span className="text-success">+2.4% (24h)</span>
        </div>
        <div className="stat-card glass-panel">
          <h3>24h Volume</h3>
          <p className="stat-value">$84.2B</p>
          <span className="text-danger">-1.2% (24h)</span>
        </div>
        <div className="stat-card glass-panel">
          <h3>BTC Dominance</h3>
          <p className="stat-value">52.4%</p>
          <span className="text-success">+0.1%</span>
        </div>
      </div>

      <div className="trending-section">
        <h2 className="section-title">Trending Coins 🔥</h2>
        {loading ? (
          <div className="loader-container"><div className="spinner"></div></div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="coins-grid">
            {trending.map((coin) => (
              <CoinCard key={coin.item.id} coin={coin.item} isTrending />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
