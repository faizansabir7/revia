import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Hero section is typically ~600-800px. Show button when main CTA is likely scrolled out.
      setScrolledPastHero(window.scrollY > 560);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <div className="nav-logo" onClick={() => navigate('/')}>
          Revia<span>.</span>
        </div>
        {/* Navigation Links Removed for minimalism */}
        <div style={{ flex: 1 }}></div>
        <div style={{ flex: 1 }}></div>
        {(location.pathname !== '/' || scrolledPastHero) && (
          <button className="nav-cta" onClick={() => navigate('/onboarding')}>
            Plan Your Event
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
