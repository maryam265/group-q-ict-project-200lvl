const BASE_URL = 'https://api.coingecko.com/api/v3';

// To avoid rate limits, we use simple endpoints
export const fetchTrendingCoins = async () => {
  const response = await fetch(`${BASE_URL}/search/trending`);
  if (!response.ok) throw new Error('Failed to fetch trending coins');
  return response.json();
};

export const fetchTopCoins = async (currency = 'usd', limit = 100) => {
  const response = await fetch(`${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`);
  if (!response.ok) throw new Error('Failed to fetch top coins');
  return response.json();
};

export const fetchCoinDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);
  if (!response.ok) throw new Error('Failed to fetch coin details');
  return response.json();
};

export const fetchCoinHistory = async (id, currency = 'usd', days = 7) => {
  const response = await fetch(`${BASE_URL}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`);
  if (!response.ok) throw new Error('Failed to fetch coin history');
  return response.json();
};
