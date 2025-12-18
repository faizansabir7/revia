import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockVendors } from '../data/mockVendors';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Star, MapPin, CheckCircle, Calendar, ArrowRight } from 'lucide-react';
import '../styles/VendorDetail.css';

const VendorDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [vendor, setVendor] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(0);

    useEffect(() => {
        // Simulate API fetch
        const found = mockVendors.find(v => v.id === parseInt(id));
        if (found) {
            setVendor(found);
            window.scrollTo(0, 0);
        } else {
            navigate('/vendors'); // Redirect if not found
        }
    }, [id, navigate]);

    if (!vendor) return <div style={{ height: '100vh', background: '#0F0F0F' }}></div>;

    return (
        <div className="vendor-detail-page">
            <Navbar />

            {/* Cinematic Hero */}
            <div className="detail-hero">
                <img src={vendor.image} alt={vendor.name} className="detail-hero-img" />
                <div className="detail-hero-content">
                    <div className="container">
                        <span className="detail-category">{vendor.category}</span>
                        <h1 className="detail-title">{vendor.name}</h1>
                        <div className="detail-location">
                            <MapPin size={18} color="var(--color-primary)" />
                            {vendor.location}
                            <span style={{ margin: '0 10px' }}>•</span>
                            <Star size={18} fill="var(--color-primary)" color="var(--color-primary)" />
                            <span style={{ fontWeight: '700', marginLeft: '5px' }}>{vendor.rating}</span>
                            <span style={{ opacity: 0.7, marginLeft: '5px' }}>({vendor.reviews} Reviews)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container detail-grid">
                {/* Left Column: Details */}
                <div className="detail-left">
                    <section className="detail-about">
                        <h2>About</h2>
                        <p className="detail-desc">{vendor.description}</p>
                    </section>

                    <section className="detail-amenities">
                        <h2>Amenities & Features</h2>
                        <div className="amenities-list">
                            {vendor.amenities?.map((item, idx) => (
                                <div key={idx} className="amenity-item">
                                    <CheckCircle size={16} color="var(--color-primary)" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="detail-gallery">
                        <h2>Gallery</h2>
                        <div className="gallery-grid">
                            {vendor.gallery?.map((img, idx) => (
                                <img key={idx} src={img} alt={`Gallery ${idx}`} className="gallery-img" />
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Sticky Booking Card */}
                <div className="detail-right">
                    <div className="booking-card">
                        <div className="price-tag">{vendor.packages?.[selectedPackage]?.price || vendor.priceRange}</div>
                        <span className="price-label">Starting Price</span>

                        {vendor.packages && (
                            <div className="package-list">
                                {vendor.packages.map((pkg, idx) => (
                                    <div
                                        key={idx}
                                        className={`package-item ${selectedPackage === idx ? 'selected' : ''}`}
                                        onClick={() => setSelectedPackage(idx)}
                                    >
                                        <span className="pkg-name">{pkg.name}</span>
                                        <div className="pkg-features" style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                                            {pkg.features.join(' • ')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <button className="request-btn">
                            Request Quote
                        </button>
                        <p style={{ textAlign: 'center', fontSize: '0.8rem', marginTop: '1rem', opacity: 0.5 }}>
                            <Calendar size={14} style={{ display: 'inline', marginRight: '5px' }} />
                            Typically responds within 24 hours
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default VendorDetailPage;
