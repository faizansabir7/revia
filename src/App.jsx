import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import VendorDirectory from './pages/VendorDirectory';
import VendorDetailPage from './pages/VendorDetailPage';

import OnboardingPage from './pages/OnboardingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/vendors" element={<VendorDirectory />} />
        <Route path="/vendors/:id" element={<VendorDetailPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
