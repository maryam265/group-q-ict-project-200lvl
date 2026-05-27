# 🚀 CryptoDash - Premium Cryptocurrency Tracking Dashboard

![Live Preview](https://img.shields.io/badge/Live_Preview-groupqcryptodash.netlify.app-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

> **Live Application:** [groupqcryptodash.netlify.app](https://groupqcryptodash.netlify.app)

CryptoDash is a modern, responsive, and highly interactive cryptocurrency tracking dashboard built with React. It empowers users to monitor real-time global market statistics, analyze price trends through interactive charts, and manage their personal crypto portfolios in a sleek, glassmorphism-inspired UI.

---

## 📑 Table of Contents
- [Project Overview](#-project-overview)
- [Group Members](#-group-members)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Project Architecture](#-project-architecture)
- [Setup & Installation](#-setup--installation)
- [API Reference](#-api-reference)
- [Challenges & Solutions](#-challenges--solutions)
- [Future Roadmap](#-future-roadmap)
- [Conclusion](#-conclusion)

---

## 📖 Project Overview
Designed to provide a seamless "decentralized finance" dashboard experience, CryptoDash aggregates massive amounts of data from the CoinGecko API and presents it intuitively. Users can explore the top 100 cryptocurrencies by market capitalization, track trending coins, and view detailed historical price data to make informed decisions. 

---

## 👥 Group Members
1. **MUHAMMED MARYAM MAYOWA** - LCU/UG/24/29701
2. *(Add Member 2)*
3. *(Add Member 3)*
4. *(Add Member 4)*
5. *(Add Member 5)*
6. *(Add Member 6)*
7. *(Add Member 7)*
8. *(Add Member 8)*
9. *(Add Member 9)*
10. *(Add Member 10)*

---

## ✨ Key Features
- **Real-Time Market Data:** Live integration with the CoinGecko API for instant global market stats, trending assets, and top coin rankings.
- **Advanced Interactive Charting:** Historical price line charts with interactive tooltips powered by `Chart.js`. Features dynamic time-range filtering (1D, 7D, 30D, 90D, 365D, Max).
- **Personal Portfolio & Watchlist:** Users can seamlessly add or remove coins to a personalized portfolio. Data is securely persisted across sessions using the browser's `LocalStorage`.
- **Robust Routing System:** Full SPA (Single Page Application) multi-page navigation including Home, Market, Coin Details, Portfolio, Authentication pages, Profile, and Settings, utilizing `react-router-dom`.
- **Mock Authentication:** Functional login and registration UI utilizing the Context API to mock user sessions and restrict access to protected routes (e.g., Portfolio).
- **Dynamic Theme Management:** Integrated Context-API based Dark and Light mode toggle, complementing a modern, responsive glassmorphism aesthetic.
- **Intelligent Search & Filter:** Find specific coins instantly by name or ticker symbol directly on the Market page.
- **Graceful Error Handling:** Implemented skeleton loaders, loading spinners, and error boundaries for a resilient user experience during network delays.

---

## 🛠️ Technology Stack
**Frontend Ecosystem:**
- **Framework:** React 18 (Bootstrapped with Vite for optimal HMR and build performance)
- **Routing:** React Router DOM v6
- **State Management:** React Context API & React Hooks (`useState`, `useEffect`, `useMemo`, `useCallback`)
- **Styling:** Vanilla CSS3 with CSS Variables for Theme Management (Glassmorphism UI)
- **Data Visualization:** `Chart.js` via `react-chartjs-2`
- **Iconography:** `lucide-react`
- **Data Persistence:** Web Storage API (`localStorage`)

---

## ⚙️ Project Architecture
The application is built using a modular, component-based architecture:
- `/src/components` - Reusable UI elements (Navbar, Footer, Buttons, Loaders, Charts).
- `/src/pages` - Top-level route components (Home, Market, Portfolio, Coin Details).
- `/src/context` - Global state providers (ThemeContext, AuthContext, PortfolioContext).
- `/src/services` - API utility functions to handle CoinGecko data fetching.
- `/src/assets` - Static assets (images, global CSS).

---

## 🚀 Setup & Installation
To run this project locally on your machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd crypto-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in Browser:**
   Navigate to `http://localhost:5173` to view the application.

---

## 📡 API Reference
This project relies on the free **CoinGecko API v3**. 
* **Base URL:** `https://api.coingecko.com/api/v3`
* **Endpoints Used:**
  * `/search/trending` - Fetches the top trending search coins.
  * `/coins/markets` - Retrieves the top cryptocurrencies by market cap.
  * `/coins/{id}` - Fetches detailed information for a specific coin.
  * `/coins/{id}/market_chart` - Fetches historical price data for charting.

---

## 🚧 Challenges & Solutions
- **API Rate Limiting:** Free cryptocurrency APIs impose strict rate limits. 
  * *Solution:* We mitigated this by minimizing unnecessary network calls, implementing intelligent caching strategies where possible, and showing friendly error messages when limits are hit.
- **Complex State Management:** Passing portfolio, user session, and theme data across deeply nested components.
  * *Solution:* Implemented the `Context API` to provide global state access, eliminating complex prop drilling.
- **Responsive Charting:** Ensuring `Chart.js` canvases resize perfectly across devices.
  * *Solution:* Fine-tuned CSS flex layouts and utilized responsive `Chart.js` options to maintain aspect ratios and visual fidelity on mobile and desktop.
- **Asynchronous Data Handling:** Managing multiple concurrent API promises.
  * *Solution:* Utilized `Promise.all` for parallel fetching and implemented cohesive loading states to prevent UI flickering.

---

## 🔮 Future Roadmap
- [ ] Transition from local storage to a backend database (e.g., Firebase, Supabase) for user portfolio persistence.
- [ ] Add real-time price updates using WebSockets instead of REST API polling.
- [ ] Implement a news feed for the latest cryptocurrency developments.
- [ ] Support multiple fiat currencies (EUR, GBP, JPY, etc.) beyond USD.

---

## 🏁 Conclusion
CryptoDash successfully demonstrates the application of modern web development principles to build a "real-world" decentralized finance dashboard. By utilizing React's component-based architecture alongside context-driven state management and dynamic routing, we have delivered an intuitive, high-performance platform. The integration of live API data and persistent storage provides users with practical utility for tracking their cryptocurrency investments.
