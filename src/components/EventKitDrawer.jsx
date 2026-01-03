import React from 'react';
import { useEvent } from '../context/EventContext';
import { X, Trash2, ShoppingBag } from 'lucide-react';

const EventKitDrawer = ({ isOpen, onClose }) => {
    const { myVendors, removeVendor, totalBudget, spent } = useEvent();

    const styles = {
        overlay: {
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? 'all' : 'none',
            transition: 'opacity 0.3s ease',
            zIndex: 1001,
        },
        drawer: {
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '400px',
            maxWidth: '90vw',
            background: '#1a1a1a',
            borderLeft: '1px solid var(--glass-border)',
            transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 1002,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
        },
        header: {
            padding: '1.5rem',
            borderBottom: '1px solid var(--glass-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.02)',
        },
        title: {
            fontSize: '1.5rem',
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-primary)',
        },
        closeBtn: {
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            padding: '4px',
        },
        content: {
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem',
        },
        emptyState: {
            textAlign: 'center',
            color: 'var(--color-text-muted)',
            marginTop: '3rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
        },
        vendorItem: {
            display: 'flex',
            gap: '1rem',
            background: 'rgba(255,255,255,0.03)',
            padding: '1rem',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '1rem',
            border: '1px solid rgba(255,255,255,0.05)',
        },
        vendorImg: {
            width: '60px',
            height: '60px',
            borderRadius: '4px',
            objectFit: 'cover',
        },
        vendorInfo: {
            flex: 1,
        },
        vendorName: {
            fontWeight: '600',
            marginBottom: '0.2rem',
        },
        vendorPrice: {
            fontSize: '0.9rem',
            color: 'var(--color-text-muted)',
        },
        removeBtn: {
            background: 'none',
            border: 'none',
            color: '#F44336',
            cursor: 'pointer',
            padding: '4px',
            alignSelf: 'flex-start',
            opacity: 0.7,
        },
        footer: {
            padding: '1.5rem',
            borderTop: '1px solid var(--glass-border)',
            background: 'rgba(0,0,0,0.2)',
        },
        totalRow: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            fontSize: '1.2rem',
            fontWeight: '600',
        },
        checkoutBtn: {
            width: '100%',
            padding: '1rem',
            background: 'var(--color-primary)',
            color: '#000',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            fontWeight: '600',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '1px',
        }
    };

    return (
        <>
            <div style={styles.overlay} onClick={onClose} />
            <div style={styles.drawer}>
                <div style={styles.header}>
                    <h2 style={styles.title}>My Event Kit</h2>
                    <button style={styles.closeBtn} onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div style={styles.content}>
                    {myVendors.length === 0 ? (
                        <div style={styles.emptyState}>
                            <ShoppingBag size={48} opacity={0.5} />
                            <p>Your kit is empty.<br />Start adding vendors to plan your event.</p>
                        </div>
                    ) : (
                        myVendors.map(vendor => (
                            <div key={vendor.id} style={styles.vendorItem}>
                                <img src={vendor.image} alt={vendor.name} style={styles.vendorImg} />
                                <div style={styles.vendorInfo}>
                                    <div style={styles.vendorName}>{vendor.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--color-primary)', marginBottom: '0.2rem' }}>
                                        {vendor.category}
                                    </div>
                                    <div style={styles.vendorPrice}>
                                        {vendor.packages && vendor.packages.length > 0
                                            ? vendor.packages[0].price
                                            : vendor.priceRange}
                                    </div>
                                </div>
                                <button
                                    style={styles.removeBtn}
                                    onClick={() => removeVendor(vendor.id)}
                                    title="Remove from kit"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div style={styles.footer}>
                    <div style={styles.totalRow}>
                        <span>Total Estimated</span>
                        <span style={{ color: 'var(--color-primary)' }}>
                            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(spent)}
                        </span>
                    </div>
                    <button style={styles.checkoutBtn} disabled={myVendors.length === 0}>
                        Finalize Plan
                    </button>
                </div>
            </div>
        </>
    );
};

export default EventKitDrawer;
