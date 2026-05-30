Project Documentation: CryptoDash
Project link: groupqcryptodash.netlify.app
Project Title: CryptoDash - Premium Cryptocurrency Tracking Dashboard
Department: computer science
Group Members
1. MUHAMMED MARYAM MAYOWA -LCU/UG/24/29701
2. OLUWADARE ISAAC OLUWAKOREDE -LCU/UG/24/28563
3. OLADAYO OLUWAFERANMI TOBILOBA-LCU/UG/24/33535
4. OKAFOR CHISOM CELINE-LCU/UG/24/32815
5. ALBERT TEMINIOLUWA-LCU/UG/24/29964
6. OLASEINDE SAMUEL OLUWATOSIN-LCU/UG/24/30742
7. AGBOGHOROMA ABRAHAM TEMISAN-LCU/PT/24/0799 
8. GABRIEL NAETOCHUKWU-LCU/UG/24/31179
9. 
10. 
11. 
Features Implemented
1. Live Coin Prices:Integration with CoinGecko API to fetch real-time data for global market statistics, trending coins, and top 100 cryptocurrencies by market cap.
2. Interactive Price Charts: Historical price line charts with interactive tooltips, powered by Chart.js. Includes time-range filtering (1D, 7D, 30D, 90D, 365D).
3. React Router Navigation:Full multi-page routing including Home, Market, Coin Details, Portfolio, Login, Register, Profile, Settings, About, Contact, and a custom 404 page.
4. Local Portfolio & Watchlist: Users can add/remove coins to their personal portfolio, managed securely via the browser's Local Storage.
5. Modern UI/UX Design:A responsive, glassmorphism-inspired interface with dark mode. Includes loaders for async requests and error boundaries.
6. Dynamic Theme Switching: Context-API based dark and light mode toggle.
7. Mock Authentication System:Functional login and registration UI utilizing Context API to restrict access to protected routes like the Portfolio.
8. Search & Filter functionality:Find coins instantly by name or symbol on the Market page.

 Tools Used
- Frontend Framework:React (Vite)
- Routing: React Router v6
- State Management:React Context API & React Hooks (`useState`, `useEffect`)
- Styling:Custom CSS with CSS Variables for Theme Management (Glassmorphism & Dark Mode)
- Data Visualization:** Chart.js & react-chartjs-2
- Icons: Lucide React
- API Data Source:CoinGecko API v3
- Data Persistence:Web Storage API (Local Storage)

Challenges Faced
- API Rate Limiting: Free cryptocurrency APIs like CoinGecko impose strict rate limits. We managed this by minimizing unnecessary network calls and loading specific endpoints.
- Complex State Management:Passing portfolio and theme data across deeply nested components was initially challenging. We resolved this by implementing the Context API, avoiding prop drilling.
- Responsive Charting:Ensuring the Chart.js canvas resized perfectly across mobile, tablet, and desktop without losing resolution required fine-tuning CSS flex layouts and chart options.
- Asynchronous Data Handling:Implementing cohesive loading spinners and error states while awaiting multiple concurrent API promises (e.g., fetching coin details + historical data simultaneously).

Conclusion
CryptoDash successfully demonstrates the application of modern web development principles to build a "real-world" decentralized finance dashboard. By utilizing React's component-based architecture alongside context-driven state management and dynamic routing, we have delivered an intuitive, high-performance platform. The integration of live API data and persistent storage provides users with practical utility for tracking their cryptocurrency investments.
