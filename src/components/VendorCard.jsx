import React from 'react';
import { Star, MapPin, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VendorCard = ({ vendor }) => {
    const navigate = useNavigate();
    const styles = {
        card: {
            backgroundColor: 'rgba(26, 26, 26, 0.6)',
            backdropFilter: 'blur(10px)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: '1px solid var(--glass-border)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            position: 'relative',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        },
        imageContainer: {
            height: '220px',
            overflow: 'hidden',
            position: 'relative',
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
        },
        content: {
            padding: '1.2rem',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '0.5rem',
        },
        name: {
            fontSize: '1.2rem',
            fontWeight: '600',
            color: 'var(--color-text-main)',
            marginBottom: '0.2rem',
        },
        category: {
            fontSize: '0.9rem',
            color: 'var(--color-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontWeight: '500',
        },
        rating: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            color: '#FFD700',
            fontSize: '0.9rem',
            marginBottom: '0.8rem',
        },
        reviewCount: {
            color: 'var(--color-text-muted)',
            fontSize: '0.8rem',
            marginLeft: '0.3rem',
        },
        footer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 'auto',
            borderTop: '1px solid var(--glass-border)',
            paddingTop: '0.8rem',
        },
        location: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            color: 'var(--color-text-muted)',
            fontSize: '0.85rem',
        },
        price: {
            fontWeight: '600',
            color: 'var(--color-text-main)',
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
            onClick={() => navigate(`/vendors/${vendor.id}`)}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                e.currentTarget.querySelector('img').style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.querySelector('img').style.transform = 'scale(1)';
            }}
        >
            <div style={styles.imageContainer}>
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
                    <div>
                        <h3 style={styles.name}>{vendor.name}</h3>
                        <span style={styles.category}>{vendor.category}</span>
                    </div>
                </div>

                <div style={styles.rating}>
                    <Star size={16} fill="#FFD700" />
                    <span>{vendor.rating}</span>
                    <span style={styles.reviewCount}>({vendor.reviews} reviews)</span>
                </div>

                <div style={styles.footer}>
                    <div style={styles.location}>
                        <MapPin size={14} />
                        {vendor.location}
                    </div>
                    <div style={styles.price}>{vendor.priceRange}</div>
                </div>
            </div>
        </div>
    );
};

export default VendorCard;
