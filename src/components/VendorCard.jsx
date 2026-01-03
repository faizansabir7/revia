import React from 'react';
import { Star, MapPin, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEvent } from '../context/EventContext';

const VendorCard = ({ vendor }) => {
    const navigate = useNavigate();
    const { addVendor, isVendorSelected } = useEvent();
    const isAdded = isVendorSelected(vendor.id);
    const isBooked = vendor.availability === 'Booked';

    // Get starting price from packages if available
    const startingPrice = vendor.packages && vendor.packages.length > 0
        ? vendor.packages[0].price
        : vendor.priceRange;

    // Availability Color Map
    const getAvailabilityColor = (status) => {
        switch (status) {
            case 'Available': return '#4CAF50'; // Green
            case 'Fast Filling': return '#FFC107'; // Amber
            case 'Booked': return '#F44336'; // Red
            default: return '#9E9E9E';
        }
    };

    const styles = {
        card: {
            backgroundColor: 'rgba(26, 26, 26, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: '1px solid var(--glass-border)',
            transition: 'all 0.3s ease',
            position: 'relative',
            cursor: 'default',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        },
        imageContainer: {
            height: '200px',
            overflow: 'hidden',
            position: 'relative',
            cursor: 'pointer',
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
        },
        badge: {
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            zIndex: 2,
            border: '1px solid rgba(255,255,255,0.1)'
        },
        content: {
            padding: '1.2rem',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        name: {
            fontSize: '1.15rem',
            fontWeight: '600',
            color: 'var(--color-text-main)',
            marginBottom: '0.2rem',
            cursor: 'pointer',
        },
        ratingRow: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.9rem',
            color: 'var(--color-text-muted)',
            marginBottom: '0.2rem',
        },
        tagsRow: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
        },
        suitabilityTag: {
            fontSize: '0.7rem',
            padding: '2px 8px',
            borderRadius: '4px',
            background: 'rgba(197, 160, 89, 0.1)',
            color: 'var(--color-primary)',
            border: '1px solid rgba(197, 160, 89, 0.2)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
        },
        priceRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 'auto',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255,255,255,0.05)',
        },
        priceLabel: {
            fontSize: '0.8rem',
            color: 'var(--color-text-muted)',
        },
        priceValue: {
            fontSize: '1.1rem',
            fontWeight: '600',
            color: '#fff',
        },
        ctaBtn: {
            width: '100%',
            padding: '0.8rem',
            marginTop: '1rem',
            background: isBooked ? 'rgba(255, 255, 255, 0.1)' : (isAdded ? '#4CAF50' : 'var(--color-primary)'),
            color: isBooked ? '#aaa' : (isAdded ? '#fff' : '#000'),
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            fontWeight: '600',
            fontSize: '0.9rem',
            cursor: (isBooked || isAdded) ? 'default' : 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
        },
        heartBtn: {
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(0,0,0,0.4)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            zIndex: 2,
        }
    };

    return (
        <div
            style={styles.card}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            <div style={styles.imageContainer} onClick={() => navigate(`/vendors/${vendor.id}`)}>
                {vendor.availability && (
                    <div style={styles.badge}>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: getAvailabilityColor(vendor.availability)
                        }}></div>
                        {vendor.availability}
                    </div>
                )}
                <button
                    style={styles.heartBtn}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Add shortlist logic here
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.4)'}
                >
                    <Heart size={18} />
                </button>
                <img src={vendor.image} alt={vendor.name} style={styles.image} />
            </div>

            <div style={styles.content}>
                <div style={styles.header}>
                    <div onClick={() => navigate(`/vendors/${vendor.id}`)}>
                        <h3 style={styles.name}>{vendor.name}</h3>
                        <div style={styles.ratingRow}>
                            <Star size={14} fill="#FFD700" color="#FFD700" />
                            <span style={{ color: '#fff', fontWeight: 500 }}>{vendor.rating}</span>
                            <span>({vendor.reviews})</span>
                            <span>•</span>
                            <span>{vendor.category}</span>
                        </div>
                    </div>
                </div>

                {/* Best For Tags */}
                {vendor.suitability && (
                    <div style={styles.tagsRow}>
                        {vendor.suitability.map((tag, idx) => (
                            <span key={idx} style={styles.suitabilityTag}>{tag}</span>
                        ))}
                    </div>
                )}

                {/* Footer Section: Price & CTA */}
                <div>
                    <div style={styles.priceRow}>
                        <div>
                            <div style={styles.priceLabel}>Starting from</div>
                            <div style={styles.priceValue}>{startingPrice}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={styles.priceLabel}>Location</div>
                            <div style={{ fontSize: '0.9rem', color: '#ccc' }}>{vendor.location.split(',')[0]}</div>
                        </div>
                    </div>

                    <button
                        style={styles.ctaBtn}
                        disabled={isBooked}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!isAdded && !isBooked) {
                                addVendor(vendor);
                            }
                        }}
                        onMouseEnter={(e) => !isAdded && !isBooked && (e.target.style.transform = 'scale(1.02)')}
                        onMouseLeave={(e) => !isAdded && !isBooked && (e.target.style.transform = 'scale(1)')}
                    >
                        {isBooked ? 'Unavailable' : (isAdded ? 'Added to Event' : 'Add to My Event')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VendorCard;
