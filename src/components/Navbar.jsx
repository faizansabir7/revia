import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
        <button className="nav-cta" onClick={() => navigate('/onboarding')}>
          Plan Your Event
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
