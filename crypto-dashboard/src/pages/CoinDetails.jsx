import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCoinDetails, fetchCoinHistory } from '../services/api';
import { PortfolioContext } from '../context/PortfolioContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import './CoinDetails.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [history, setHistory] = useState([]);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToPortfolio, removeFromPortfolio, isInPortfolio } = useContext(PortfolioContext);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const [coinData, historyData] = await Promise.all([
          fetchCoinDetails(id),
          fetchCoinHistory(id, 'usd', days)
        ]);
        setCoin(coinData);
        setHistory(historyData.prices);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id, days]);

  if (loading) return <div className="loader-container"><div className="spinner"></div></div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!coin) return null;

  const chartData = {
    labels: history.map(point => {
      const date = new Date(point[0]);
      return days === 1 ? date.toLocaleTimeString() : date.toLocaleDateString();
    }),
    datasets: [
      {
        label: `${coin.name} Price (USD)`,
        data: history.map(point => point[1]),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 5,
        borderWidth: 2,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(10, 14, 23, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
      },
    },
    scales: {
      x: { grid: { display: false, drawBorder: false }, ticks: { color: '#94a3b8' } },
      y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } }
    },
    interaction: { mode: 'nearest', axis: 'x', intersect: false },
  };

  const inPortfolio = isInPortfolio(coin.id);

  return (
    <div className="coin-details-container">
      <div className="coin-header glass-panel">
        <div className="coin-header-left">
          <img src={coin.image.large} alt={coin.name} className="coin-large-image" />
          <div>
            <h1 className="coin-title">{coin.name} <span className="coin-symbol-badge">{coin.symbol.toUpperCase()}</span></h1>
            <div className="coin-rank">Rank #{coin.market_cap_rank}</div>
          </div>
        </div>
        <div className="coin-header-right">
          <div className="coin-current-price">
            ${coin.market_data.current_price.usd.toLocaleString()}
          </div>
          <div className={`coin-price-change ${coin.market_data.price_change_percentage_24h >= 0 ? 'text-success' : 'text-danger'}`}>
            {coin.market_data.price_change_percentage_24h >= 0 ? '▲' : '▼'}
            {Math.abs(coin.market_data.price_change_percentage_24h).toFixed(2)}%
          </div>
          <button 
            className={`btn-portfolio ${inPortfolio ? 'btn-remove' : 'btn-add'}`}
            onClick={() => inPortfolio ? removeFromPortfolio(coin.id) : addToPortfolio({
              id: coin.id,
              name: coin.name,
              symbol: coin.symbol,
              image: coin.image.large,
              current_price: coin.market_data.current_price.usd,
              price_change_percentage_24h: coin.market_data.price_change_percentage_24h
            })}
          >
            {inPortfolio ? 'Remove from Portfolio' : 'Add to Portfolio'}
          </button>
        </div>
      </div>

      <div className="chart-section glass-panel">
        <div className="chart-controls">
          {['1', '7', '30', '90', '365'].map(d => (
            <button 
              key={d} 
              className={`chart-btn ${days === parseInt(d) ? 'active' : ''}`}
              onClick={() => setDays(parseInt(d))}
            >
              {d}D
            </button>
          ))}
        </div>
        <div className="chart-container">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="coin-stats glass-panel">
        <h2>Market Stats</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Market Cap</span>
            <span className="stat-val">${coin.market_data.market_cap.usd.toLocaleString()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">24h Volume</span>
            <span className="stat-val">${coin.market_data.total_volume.usd.toLocaleString()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Circulating Supply</span>
            <span className="stat-val">{coin.market_data.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Supply</span>
            <span className="stat-val">{coin.market_data.total_supply ? coin.market_data.total_supply.toLocaleString() : '∞'} {coin.symbol.toUpperCase()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">All Time High</span>
            <span className="stat-val">${coin.market_data.ath.usd.toLocaleString()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">All Time Low</span>
            <span className="stat-val">${coin.market_data.atl.usd.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="coin-description glass-panel">
        <h2>About {coin.name}</h2>
        <div className="desc-content" dangerouslySetInnerHTML={{ __html: coin.description.en || 'No description available.' }}></div>
      </div>
    </div>
  );
};

export default CoinDetails;
