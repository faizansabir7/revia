import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import VendorCard from '../components/VendorCard';
import FilterBar from '../components/FilterBar';
import { mockVendors } from '../data/mockVendors';

const VendorDirectory = () => {
    const location = useLocation();
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    // Handle incoming filters from Onboarding or Landing Page
    useEffect(() => {
        if (location.state) {
            if (location.state.category) {
                setActiveCategory(location.state.category);
            } else if (location.state.filter && location.state.filter.eventType) {
                // Map Onboarding Event Type to Category if possible, or just default to All/Venue logic
                // For now, let's keep it simple or map specific known types
                // Example: 'Wedding' -> Show all relevant (maybe no specific category filter, just context?)
                // Since our categories are Service-based (Venue, Photo), but Onboarding is Event-based (Wedding)
                // We might settle for just showing "All" or a specific default text, 
                // but let's assume 'category' state is the primary direct filter.
            }
        }
    }, [location.state]);

    const filteredVendors = mockVendors.filter(vendor => {
        const matchesCategory = activeCategory === "All" || vendor.category === activeCategory;
        const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vendor.location.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const styles = {
        page: {
            minHeight: '100vh',
            paddingTop: '100px', // Space for fixed navbar
            paddingBottom: '4rem',
        },
        header: {
            textAlign: 'center',
            marginBottom: '3rem',
        },
        title: {
            fontSize: '2.5rem',
            marginBottom: '1rem',
        },
        subtitle: {
            color: 'var(--color-text-muted)',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '1rem',
        },
        emptyState: {
            textAlign: 'center',
            padding: '4rem',
            color: 'var(--color-text-muted)',
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container" style={styles.page}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Find Your <span className="text-gradient">Perfect Vendors</span></h1>
                    <p style={styles.subtitle}>Curated selection of best-in-class service providers</p>
                </div>

                <FilterBar
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                {filteredVendors.length > 0 ? (
                    <div style={styles.grid}>
                        {filteredVendors.map(vendor => (
                            <VendorCard key={vendor.id} vendor={vendor} />
                        ))}
                    </div>
                ) : (
                    <div style={styles.emptyState}>
                        <h3>No vendors found matching your criteria.</h3>
                        <p>Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VendorDirectory;
