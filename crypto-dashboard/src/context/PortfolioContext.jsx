import React, { createContext, useState, useEffect } from 'react';

export const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem('crypto_portfolio');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('crypto_portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  const addToPortfolio = (coin) => {
    if (!portfolio.find(item => item.id === coin.id)) {
      setPortfolio([...portfolio, coin]);
    }
  };

  const removeFromPortfolio = (coinId) => {
    setPortfolio(portfolio.filter(item => item.id !== coinId));
  };

  const isInPortfolio = (coinId) => {
    return portfolio.some(item => item.id === coinId);
  };

  return (
    <PortfolioContext.Provider value={{ portfolio, addToPortfolio, removeFromPortfolio, isInPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
};
