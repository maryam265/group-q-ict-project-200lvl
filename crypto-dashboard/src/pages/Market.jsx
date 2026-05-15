import React, { useState, useEffect } from 'react';
import { fetchTopCoins } from '../services/api';
import CoinCard from '../components/CoinCard';
import './Market.css';

const Market = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getCoins = async () => {
      try {
        const data = await fetchTopCoins('usd', 100);
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getCoins();
  }, []);

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="market-container">
      <div className="market-header">
        <h1 className="page-title">Market <span className="text-accent">Overview</span></h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search coins (e.g., Bitcoin, BTC)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input search-input"
          />
        </div>
      </div>

      {loading ? (
        <div className="loader-container"><div className="spinner"></div></div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="coins-grid">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => (
              <CoinCard key={coin.id} coin={coin} />
            ))
          ) : (
            <div className="no-results">No coins found matching "{searchTerm}"</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Market;
