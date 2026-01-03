import React, { createContext, useContext, useState, useEffect } from 'react';
import { Users, X, Check } from 'lucide-react';

const EventContext = createContext();

export const useEvent = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
    // Persistent state initialization
    const [myVendors, setMyVendors] = useState(() => {
        const saved = localStorage.getItem('revia_my_vendors');
        return saved ? JSON.parse(saved) : [];
    });

    const [totalBudget, setTotalBudget] = useState(() => {
        const saved = localStorage.getItem('revia_total_budget');
        return saved ? JSON.parse(saved) : 2000000; // Default 20 Lakhs
    });

    const [spent, setSpent] = useState(0);

    // Modal State
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
    const [pendingVendor, setPendingVendor] = useState(null);
    const [modalGuestCount, setModalGuestCount] = useState(200); // Default

    // Calculate spent whenever vendors change
    useEffect(() => {
        const total = myVendors.reduce((sum, vendor) => {
            let price = 0;
            let priceString = "";

            if (vendor.packages && vendor.packages.length > 0) {
                priceString = vendor.packages[0].price;
            } else if (typeof vendor.priceRange === 'string') {
                // Fallback for rough range if no package
                if (vendor.priceRange === '$') price = 50000;
                if (vendor.priceRange === '$$') price = 150000;
                if (vendor.priceRange === '$$$') price = 500000;
                if (vendor.priceRange === '$$$$') price = 1000000;
            }

            if (priceString) {
                // Check if per plate
                const isPerPlate = priceString.toLowerCase().includes("plate");
                const numericPart = parseInt(priceString.replace(/[^0-9]/g, '')) || 0;

                if (isPerPlate && vendor.guestCount) {
                    price = numericPart * vendor.guestCount;
                } else {
                    price = numericPart;
                }
            }

            return sum + price;
        }, 0);
        setSpent(total);

        // Persist vendors
        localStorage.setItem('revia_my_vendors', JSON.stringify(myVendors));
    }, [myVendors]);

    // Persist budget
    useEffect(() => {
        localStorage.setItem('revia_total_budget', JSON.stringify(totalBudget));
    }, [totalBudget]);

    const addVendor = (vendor, guestCount = null) => {
        if (isVendorSelected(vendor.id)) return;

        // Check if we need to prompt for guests
        // 1. Is it per plate?
        // 2. Was guestCount NOT provided?
        const hasPerPlate = vendor.packages?.some(p => p.price.toLowerCase().includes('plate'));

        if (hasPerPlate && guestCount === null) {
            setPendingVendor(vendor);
            setIsGuestModalOpen(true);
            return;
        }

        setMyVendors(prev => {
            // Store guest count with vendor if provided
            const vendorToAdd = guestCount ? { ...vendor, guestCount } : vendor;
            return [...prev, vendorToAdd];
        });
    };

    const confirmGuestCount = () => {
        if (pendingVendor && modalGuestCount > 0) {
            addVendor(pendingVendor, modalGuestCount);
            closeGuestModal();
        }
    };

    const closeGuestModal = () => {
        setIsGuestModalOpen(false);
        setPendingVendor(null);
        setModalGuestCount(200);
    };

    const removeVendor = (vendorId) => {
        setMyVendors(prev => prev.filter(v => v.id !== vendorId));
    };

    const isVendorSelected = (vendorId) => {
        return myVendors.some(v => v.id === vendorId);
    };

    const value = {
        myVendors,
        totalBudget,
        spent,
        addVendor,
        removeVendor,
        isVendorSelected,
        setTotalBudget
    };

    // Modal Components
    const GuestModal = () => {
        if (!isGuestModalOpen) return null;

        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2000
            }}>
                <div style={{
                    background: '#1a1a1a',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '2rem',
                    borderRadius: '16px',
                    width: '90%',
                    maxWidth: '400px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    animation: 'fadeIn 0.2s ease-out'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ margin: 0, color: '#fff', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>Guest Count</h3>
                        <button onClick={closeGuestModal} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
                            <X size={20} />
                        </button>
                    </div>

                    <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                        {pendingVendor?.name} charges per plate. How many guests are you expecting?
                    </p>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '8px',
                        padding: '0.8rem',
                        marginBottom: '2rem',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <Users size={20} color="#666" style={{ marginRight: '12px' }} />
                        <input
                            type="number"
                            value={modalGuestCount}
                            onChange={(e) => setModalGuestCount(parseInt(e.target.value) || 0)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#fff',
                                fontSize: '1.2rem',
                                width: '100%',
                                outline: 'none'
                            }}
                            autoFocus
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={closeGuestModal}
                            style={{
                                flex: 1,
                                padding: '12px',
                                borderRadius: '8px',
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#ccc',
                                cursor: 'pointer',
                                fontWeight: '500'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmGuestCount}
                            style={{
                                flex: 2,
                                padding: '12px',
                                borderRadius: '8px',
                                background: 'var(--color-primary)',
                                border: 'none',
                                color: '#000',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <EventContext.Provider value={value}>
            {children}
            <GuestModal />
        </EventContext.Provider>
    );
};
