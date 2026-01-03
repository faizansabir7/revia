import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Marquee from '../components/Marquee';
import { ArrowRight, Shield, Clock, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();
    const [arcRotation, setArcRotation] = useState(0);

    const arcCategories = [
        { name: "Venues", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800" },
        { name: "Decor", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800" },
        { name: "Photography", img: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800" },
        { name: "Music", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800" },
        { name: "Catering", img: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800" },
        { name: "Florist", img: "https://images.unsplash.com/photo-1596073419667-9d77d59f033f?q=80&w=800" },
        { name: "Makeup", img: "https://images.unsplash.com/photo-1571332283201-99c82a8b3046?q=80&w=800&auto=format&fit=crop" },
        { name: "Transport", img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800" }
    ];

    // Categories now defined inline in render

    // Helper to generate random dust particles
    const particles = Array.from({ length: 25 }).map((_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${10 + Math.random() * 20}s`,
        size: `${2 + Math.random() * 4}px`,
        opacity: 0.3 + Math.random() * 0.5
    }));

    // Create a "full wheel" by duplicating categories to cover 360 degrees
    // 8 items * 2 = 16 items. 360 / 16 = 22.5 deg per item.
    // This wider spacing ensures duplicates aren't visible simultaneously.
    const fullWheelCategories = [...arcCategories, ...arcCategories];

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
                        Design, Compare and Book Your <br />
                        <span className="text-gradient">Entire Event — In One Place</span>
                    </h1>
                    <p className="hero-subheading">
                        Personalised vendors, transparent pricing, effortless booking for weddings and events.
                    </p>
                    <div className="hero-buttons">
                        <button className="primary-btn" onClick={() => navigate('/onboarding')}>
                            Start Planning Your Event <ArrowRight size={18} />
                        </button>
                        <button className="secondary-btn" onClick={() => navigate('/vendors')}>
                            Browse Vendors
                        </button>
                    </div>
                </div>
            </section>

            {/* Marquee */}
            <section className="marquee-section">
                <Marquee speed={40}>
                    <span className="marquee-text">Weddings • Corporate • Parties • Galas • Concerts • Exhibitions • </span>
                </Marquee>
            </section>

            {/* Categories - Arc Design */}
            <section className="section container" style={{ overflow: 'hidden', paddingBottom: '0' }}>
                <div className="section-title">
                    <h2 className="section-heading">Curated Collections</h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>Hand-picked vendors matched to your style, budget, and location.</p>
                </div>

                {/* Dynamic Mouse Interaction: Move mouse X to rotate wheel */}
                <div
                    className="collection-arc-wrapper"
                    onMouseMove={(e) => {
                        // Calculate distance from center of screen
                        const centerX = window.innerWidth / 2;
                        const mouseX = e.clientX;
                        const offset = mouseX - centerX;

                        // Map offset to rotation. 
                        // If mouse is at right edge (+500px), rotate left (-25deg).
                        // Factor determines sensitivity. Higher factor = less rotation.
                        const sensitivity = 20;
                        const targetRotation = -1 * (offset / sensitivity);

                        // Clamp rotation if desired, or let it spin freely. 
                        // For infinite feel, no clamp needed, but we don't want it to spin too fast.
                        setArcRotation(targetRotation);
                    }}
                    onMouseLeave={() => setArcRotation(0)}
                >
                    <div className="arc-center-text">
                        <h3>Build Your<br />Dream Event</h3>
                    </div>
                    {fullWheelCategories.length > 0 && <div className="arc-spinner" style={{ transform: `rotate(${arcRotation}deg)` }}>
                        {fullWheelCategories.map((cat, idx, arr) => {
                            const totalItems = arr.length;
                            const angleStep = 360 / totalItems;
                            const rotation = idx * angleStep;

                            return (
                                <div
                                    key={idx}
                                    className="arc-item-container"
                                    style={{
                                        transform: `rotate(${rotation}deg)`,
                                        transformOrigin: '50% 100%'
                                    }}
                                >
                                    <div
                                        className="arc-item"
                                        onClick={() => {
                                            const targetCat = cat.name === 'Venues' ? 'Venue' : cat.name;
                                            navigate('/vendors', { state: { category: targetCat } });
                                        }}
                                    >
                                        <img src={cat.img} alt={cat.name} className="cat-img-arc" />
                                        <div className="cat-overlay-arc">
                                            <span>{cat.name}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>}
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
