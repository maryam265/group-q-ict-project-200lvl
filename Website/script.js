// Configuration
const API_URL = 'https://api.coingecko.com/api/v3';
const COINS_TO_FETCH = 20; // Number of top coins to display

// DOM Elements
const tableBody = document.getElementById('crypto-table-body');
const globalCap = document.getElementById('global-cap');
const globalVol = document.getElementById('global-vol');

// Formatters for Prices and Market Caps
const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: value < 1 ? 4 : 2,
        maximumFractionDigits: value < 1 ? 6 : 2
    }).format(value);
};

const formatCompact = (value) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        maximumFractionDigits: 2
    }).format(value);
};

// Draw a mini sparkline chart using Chart.js
const drawSparkline = (canvasId, data, color) => {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    // Create a subtle gradient fill under the line
    const gradient = ctx.createLinearGradient(0, 0, 0, 80);
    const rgbaColor = color === '#16c784' ? 'rgba(22, 199, 132, 0.3)' : 'rgba(234, 57, 67, 0.3)';
    gradient.addColorStop(0, rgbaColor);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map((_, i) => ''), // Empty labels for tooltips
            datasets: [{
                data: data,
                borderColor: color,
                borderWidth: 2.5,
                tension: 0.3,
                pointRadius: 0,
                pointHoverRadius: 5,
                fill: true,
                backgroundColor: gradient
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { display: false }, 
                tooltip: { 
                    enabled: true,
                    intersect: false,
                    mode: 'index',
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                        },
                        title: function() { return 'Price'; }
                    }
                } 
            },
            scales: { x: { display: false }, y: { display: false } },
            interaction: { mode: 'index', intersect: false }
        }
    });
};

// Create Skeleton Loading Effect
const renderSkeleton = () => {
    tableBody.innerHTML = '';
    for(let i = 0; i < 15; i++) {
        tableBody.innerHTML += `
            <tr class="loading-row">
                <td><div class="skeleton" style="width: 20px"></div></td>
                <td>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <div class="skeleton" style="width: 24px; height: 24px; border-radius: 50%;"></div>
                        <div class="skeleton" style="width: 80px"></div>
                    </div>
                </td>
                <td><div class="skeleton" style="width: 80px; margin-left: auto;"></div></td>
                <td><div class="skeleton" style="width: 50px; margin-left: auto;"></div></td>
                <td><div class="skeleton" style="width: 100px; margin-left: auto;"></div></td>
                <td><div class="skeleton" style="width: 100px; margin-left: auto;"></div></td>
                <td><div class="skeleton" style="width: 120px; margin-left: auto;"></div></td>
            </tr>
        `;
    }
};

// Fetch API Data
const fetchCryptoData = async () => {
    renderSkeleton();
    try {
        // Fetch Global Data
        const globalRes = await fetch(`${API_URL}/global`);
        const globalData = await globalRes.json();
        globalCap.innerText = formatCompact(globalData.data.total_market_cap.usd);
        globalVol.innerText = formatCompact(globalData.data.total_volume.usd);

        // Fetch Top Coins Data including 7-day sparklines
        const url = `${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${COINS_TO_FETCH}&page=1&sparkline=true&price_change_percentage=24h`;
        const res = await fetch(url);
        const coins = await res.json();

        renderTable(coins);
    } catch (error) {
        console.error("Error fetching data:", error);
        tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 3rem; color: var(--red);">Failed to load live market data. Please check your internet connection or try again later.</td></tr>`;
    }
};

// Render Data to Table
const renderTable = (coins) => {
    tableBody.innerHTML = '';
    
    coins.forEach((coin, index) => {
        const change24h = coin.price_change_percentage_24h || 0;
        const changeClass = change24h >= 0 ? 'change-up' : 'change-down';
        const changeSymbol = change24h >= 0 ? '▲' : '▼';
        const chartColor = change24h >= 0 ? '#16c784' : '#ea3943';
        const canvasId = `chart-${coin.id}`;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="color: var(--text-secondary);">${index + 1}</td>
            <td>
                <div class="coin-name-cell">
                    <img src="${coin.image}" alt="${coin.name}" class="coin-icon">
                    <span class="coin-name">${coin.name}</span>
                    <span class="coin-symbol">${coin.symbol}</span>
                </div>
            </td>
            <td class="price">${formatCurrency(coin.current_price)}</td>
            <td class="${changeClass}">${changeSymbol} ${Math.abs(change24h).toFixed(2)}%</td>
            <td>${formatCompact(coin.market_cap)}</td>
            <td>${formatCompact(coin.total_volume)}</td>
            <td>
                <div class="chart-container">
                    <canvas id="${canvasId}"></canvas>
                </div>
            </td>
        `;
        tableBody.appendChild(row);

        // Render the tiny 7-day sparkline chart
        if (coin.sparkline_in_7d && coin.sparkline_in_7d.price) {
            drawSparkline(canvasId, coin.sparkline_in_7d.price, chartColor);
        }
    });
};

// Start application
fetchCryptoData();
