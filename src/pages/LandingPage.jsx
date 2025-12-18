import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Marquee from '../components/Marquee';
import { ArrowRight, Shield, Clock, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    const categories = [
        { name: "Venues", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800" },
        { name: "Photography", img: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800" },
        { name: "Decor", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800" }
    ];

    // Helper to generate random dust particles
    const particles = Array.from({ length: 25 }).map((_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${10 + Math.random() * 20}s`,
        size: `${2 + Math.random() * 4}px`,
        opacity: 0.3 + Math.random() * 0.5
    }));

    return (
        <div>
            <Navbar />

            {/* Hero */}
            <section className="hero-section">
                <div className="hero-bg"></div>
                <div className="hero-overlay"></div>
                <div className="noise-texture"></div>

                {/* Gold Dust Particles */}
                <div className="dust-container">
                    {particles.map((p, i) => (
                        <div key={i} className="dust-particle" style={{
                            left: p.left,
                            top: p.top,
                            width: p.size,
                            height: p.size,
                            animationDuration: p.duration,
                            animationDelay: p.delay,
                            opacity: p.opacity
                        }} />
                    ))}
                </div>

                <div className="hero-content">
                    <div className="hero-badge">Reimagining Events</div>
                    <h1 className="hero-heading">
                        Orchestrate the <br />
                        <span className="text-gradient">Perfect Event</span>
                    </h1>
                    <p className="hero-subheading">
                        The finest vendors, curated by AI for you.
                    </p>
                    <div className="hero-buttons">
                        <button className="primary-btn" onClick={() => navigate('/vendors')}>
                            Explore Vendors <ArrowRight size={18} />
                        </button>
                        {/* Secondary button removed as requested */}
                    </div>
                </div>
            </section>

            {/* Marquee */}
            <section className="marquee-section">
                <Marquee speed={25}>
                    <span className="marquee-text">Weddings • Corporate • Parties • Galas • Concerts • Exhibitions • </span>
                </Marquee>
            </section>

            {/* Categories */}
            <section className="section container">
                <div className="section-title">
                    <h2 className="section-heading">Curated Collections</h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>Handpicked categories for every need</p>
                </div>
                <div className="grid-container">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="category-card" onClick={() => {
                            // Map 'Venues' -> 'Venue' to match FilterBar
                            const targetCat = cat.name === 'Venues' ? 'Venue' : cat.name;
                            navigate('/vendors', { state: { category: targetCat } });
                        }} style={{ cursor: 'pointer' }}>
                            <img src={cat.img} alt={cat.name} className="cat-img" />
                            <div className="cat-overlay">
                                <h3 style={{ fontSize: '1.8rem' }}>{cat.name}</h3>
                                <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '0.5rem' }}>
                                    View Collection <ArrowRight size={14} style={{ display: 'inline', marginLeft: '5px' }} />
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Value Props */}
            <section className="value-section">
                <div className="container">
                    <div className="grid-container">
                        {[
                            { icon: Shield, title: "Verified Vendors", desc: "Every vendor vetted for quality." },
                            { icon: Clock, title: "Effortless Booking", desc: "Book your event in minutes." },
                            { icon: Heart, title: "Curated for You", desc: "AI suggestions matched to your style." }
                        ].map((item, idx) => (
                            <div key={idx} className="value-card">
                                <div className="icon-circle">
                                    <item.icon size={32} />
                                </div>
                                <span className="editorial-num">0{idx + 1}</span>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)', letterSpacing: '1px' }}>{item.title}</h3>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', fontWeight: '300', lineHeight: '1.8' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brand Sign-off / Finale */}
            <section className="finale-section">
                <div className="finale-content">
                    <h2 className="finale-heading">The Art of <span>Celebration</span></h2>
                    <p className="finale-sub">Your vision, curated to perfection.</p>
                    <button className="finale-btn" onClick={() => navigate('/onboarding')}>
                        Begin the Journey
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LandingPage;
