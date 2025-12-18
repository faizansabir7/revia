import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import VendorCard from '../components/VendorCard';
import FilterBar from '../components/FilterBar';
import { mockVendors } from '../data/mockVendors';

const VendorDirectory = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

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
