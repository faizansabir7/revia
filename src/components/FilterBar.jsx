import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const FilterBar = ({ activeCategory, setActiveCategory, searchTerm, setSearchTerm }) => {
    const categories = ["All", "Venue", "Photography", "Catering", "Decor"];

    const styles = {
        container: {
            marginBottom: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
        },
        topBar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
        },
        searchContainer: {
            position: 'relative',
            flexGrow: 1,
            maxWidth: '400px',
        },
        input: {
            width: '100%',
            padding: '0.8rem 1rem 0.8rem 2.5rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--glass-border)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: 'var(--color-text-main)',
            fontSize: '1rem',
            outline: 'none',
            fontFamily: 'inherit',
        },
        searchIcon: {
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--color-text-muted)',
        },
        filterBtn: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.8rem 1.5rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--glass-border)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: 'var(--color-text-main)',
            cursor: 'pointer',
            fontWeight: '500',
        },
        categories: {
            display: 'flex',
            gap: '0.8rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
        },
        categoryBtn: (isActive) => ({
            padding: '0.6rem 1.2rem',
            borderRadius: 'var(--radius-full)',
            border: isActive ? '1px solid var(--color-primary)' : '1px solid var(--glass-border)',
            backgroundColor: isActive ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
            color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.3s ease',
            fontWeight: isActive ? '600' : '400',
        })
    };

    return (
        <div style={styles.container}>
            <div style={styles.topBar}>
                <div style={styles.searchContainer}>
                    <Search size={18} style={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search vendors..."
                        style={styles.input}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button style={styles.filterBtn}>
                    <SlidersHorizontal size={18} />
                    Filters
                </button>
            </div>

            <div style={styles.categories}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        style={styles.categoryBtn(activeCategory === cat)}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilterBar;
