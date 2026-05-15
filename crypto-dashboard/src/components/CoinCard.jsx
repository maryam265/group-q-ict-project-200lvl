import React from 'react';
import { Link } from 'react-router-dom';
import './CoinCard.css';

const CoinCard = ({ coin, isTrending = false }) => {
  // CoinGecko trending endpoint returns different object structure than market endpoint
  const id = isTrending ? coin.id : coin.id;
  const name = isTrending ? coin.name : coin.name;
  const symbol = isTrending ? coin.symbol : coin.symbol;
  const image = isTrending ? coin.large : coin.image;
  const price = isTrending ? coin.data?.price : coin.current_price;
  const priceChange = isTrending ? coin.data?.price_change_percentage_24h?.usd : coin.price_change_percentage_24h;

  const isPositive = priceChange >= 0;

  return (
    <Link to={`/coin/${id}`} className="coin-card glass-panel">
      <div className="coin-card-header">
        <img src={image} alt={name} className="coin-image" />
        <div className="coin-info">
          <h3 className="coin-name">{name}</h3>
          <span className="coin-symbol">{symbol.toUpperCase()}</span>
        </div>
      </div>
      <div className="coin-card-body">
        <div className="coin-price">
          {price ? (isTrending ? price.toFixed(6) : `$${price.toLocaleString()}`) : 'N/A'}
        </div>
        <div className={`coin-change ${isPositive ? 'text-success' : 'text-danger'}`}>
          {isPositive ? '▲' : '▼'} {priceChange ? Math.abs(priceChange).toFixed(2) : 0}%
        </div>
      </div>
    </Link>
  );
};

export default CoinCard;
