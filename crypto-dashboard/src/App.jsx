import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Market from './pages/Market';
import CoinDetails from './pages/CoinDetails';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import './index.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PortfolioProvider>
          <Router>
            <div className="app-container">
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/market" element={<Market />} />
                  <Route path="/coin/:id" element={<CoinDetails />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </PortfolioProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
