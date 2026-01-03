import React from 'react';
import { useEvent } from '../context/EventContext';
import { Wallet, ChevronUp, Check, X as XIcon } from 'lucide-react';

const BudgetBar = ({ onOpenDrawer }) => {
    const { spent, totalBudget, setTotalBudget } = useEvent();
    const [isEditing, setIsEditing] = React.useState(false);
    const [editValue, setEditValue] = React.useState(totalBudget);

    // Mobile Detection
    const [isMobile, setIsMobile] = React.useState(
        typeof window !== 'undefined' ? window.innerWidth < 768 : false
    );

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Update editValue when totalBudget changes
    React.useEffect(() => {
        setEditValue(totalBudget);
    }, [totalBudget]);

    const percentage = Math.min((spent / totalBudget) * 100, 100);
    const remaining = totalBudget - spent;

    const handleSave = () => {
        const val = Number(editValue);
        if (!isNaN(val) && val > 0) {
            setTotalBudget(val);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditValue(totalBudget);
        setIsEditing(false);
    };

    // Format currency (Indian Rupee)
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const styles = {
        barContainer: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            background: 'rgba(15, 15, 15, 0.95)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            zIndex: 1000,
            padding: isMobile ? '0.75rem 1rem' : '1rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 -4px 30px rgba(0,0,0,0.6)',
            boxSizing: 'border-box', // Ensure padding doesn't overflow width
        },
        infoGroup: {
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '1rem' : '2rem',
            flex: 1,
            justifyContent: isMobile ? 'flex-start' : 'initial'
        },
        stat: {
            display: 'flex',
            flexDirection: 'column',
            minWidth: isMobile ? 'auto' : '120px',
        },
        label: {
            fontSize: isMobile ? '0.6rem' : '0.7rem',
            color: 'rgba(255, 255, 255, 0.5)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '4px',
        },
        valueGroup: {
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '0.4rem' : '0.8rem',
        },
        value: {
            fontSize: isMobile ? '1rem' : '1.25rem',
            fontWeight: '600',
            color: '#fff',
            fontFamily: 'var(--font-heading)',
            lineHeight: 1,
        },
        input: {
            background: 'transparent',
            border: 'none',
            borderBottom: '2px solid var(--color-primary)',
            color: '#fff',
            padding: '2px 0',
            fontSize: isMobile ? '1rem' : '1.25rem',
            fontWeight: '600',
            width: isMobile ? '100px' : '140px',
            outline: 'none',
            fontFamily: 'var(--font-heading)',
            MozAppearance: 'textfield',
        },
        actionBtn: {
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#fff',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'all 0.2s',
        },
        saveBtn: {
            background: 'var(--color-primary)',
            color: '#000',
            marginLeft: '4px',
        },
        editLink: {
            fontSize: isMobile ? '0.65rem' : '0.75rem',
            color: 'var(--color-primary)',
            textDecoration: 'underline',
            cursor: 'pointer',
            opacity: 0.8,
            border: 'none',
            background: 'none',
            padding: 0,
        },
        progressWrapper: {
            flex: 1,
            display: isMobile ? 'none' : 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: '500px',
            margin: '0 3rem',
        },
        progressTrack: {
            width: '100%',
            height: '4px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '2px',
            overflow: 'hidden',
        },
        progressBar: {
            height: '100%',
            width: `${percentage}%`,
            background: percentage > 90 ? '#F44336' : 'var(--color-primary)',
            transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: `0 0 10px ${percentage > 90 ? '#F44336' : 'var(--color-primary)'}`,
        },
        progressLabels: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '6px',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.4)',
        },
        openBtn: {
            background: 'var(--color-primary)',
            color: '#000',
            border: 'none',
            padding: isMobile ? '0.6rem 1rem' : '0.7rem 1.4rem',
            borderRadius: 'var(--radius-sm)',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: isMobile ? '0.85rem' : '0.95rem',
            transition: 'transform 0.2s',
            whiteSpace: 'nowrap',
        },
        styleTag: {
            display: 'none'
        }
    };

    // Inject cleaner number input styles
    const spinnerStyles = `
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
            -webkit-appearance: none; 
            margin: 0; 
        }
        input[type=number] {
            -moz-appearance: textfield;
        }
    `;

    return (
        <div style={styles.barContainer}>
            <style>{spinnerStyles}</style>

            <div style={styles.infoGroup}>
                {/* Total Budget */}
                <div style={styles.stat}>
                    <span style={styles.label}>Total Budget</span>
                    <div style={styles.valueGroup}>
                        {isEditing ? (
                            <>
                                <input
                                    type="number"
                                    style={styles.input}
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleSave();
                                        if (e.key === 'Escape') handleCancel();
                                    }}
                                />
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    <button
                                        style={{ ...styles.actionBtn, ...styles.saveBtn }}
                                        onClick={handleSave}
                                        title="Save"
                                    >
                                        <Check size={14} />
                                    </button>
                                    <button
                                        style={styles.actionBtn}
                                        onClick={handleCancel}
                                        title="Cancel"
                                    >
                                        <XIcon size={14} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <span style={styles.value}>{formatCurrency(totalBudget)}</span>
                                <button style={styles.editLink} onClick={() => setIsEditing(true)}>Edit</button>
                            </>
                        )}
                    </div>
                </div>

                {/* Progress Bar (Hidden on Mobile) */}
                <div style={styles.progressWrapper}>
                    <div style={styles.progressTrack}>
                        <div style={styles.progressBar}></div>
                    </div>
                    <div style={styles.progressLabels}>
                        <span>0%</span>
                        <span>{Math.round(percentage)}% Spent</span>
                    </div>
                </div>

                {/* Remaining */}
                <div style={styles.stat}>
                    <span style={styles.label}>Remaining</span>
                    <span style={{ ...styles.value, color: remaining < 0 ? '#F44336' : '#4CAF50' }}>
                        {formatCurrency(remaining)}
                    </span>
                </div>
            </div>

            <button
                style={styles.openBtn}
                onClick={onOpenDrawer}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
                <ChevronUp size={isMobile ? 16 : 18} />
                {isMobile ? 'Kit' : 'My Event Kit'}
            </button>
        </div>
    );
};

export default BudgetBar;
