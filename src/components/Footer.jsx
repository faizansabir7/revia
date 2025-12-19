import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
    const styles = {
        footer: {
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-text-main)',
            padding: '5rem 0 2rem',
            marginTop: 'auto',
            borderTop: '1px solid var(--glass-border)',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
        },
        brandColumn: {
            gridColumn: 'span 2', // Takes up more space
        },
        logo: {
            fontSize: '2.5rem',
            fontWeight: '700',
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-primary)',
            marginBottom: '1rem',
            display: 'inline-block',
        },
        description: {
            color: 'var(--color-text-muted)',
            maxWidth: '350px',
            marginBottom: '2rem',
        },
        heading: {
            fontSize: '1.2rem',
            fontWeight: '600',
            marginBottom: '1.5rem',
            color: 'var(--color-primary)',
        },
        linkList: {
            listStyle: 'none',
            padding: 0,
        },
        linkItem: {
            marginBottom: '0.8rem',
        },
        link: {
            color: 'var(--color-text-muted)',
            transition: 'color 0.3s ease, padding-left 0.3s ease',
            cursor: 'pointer',
        },
        socials: {
            display: 'flex',
            gap: '1rem',
        },
        socialIcon: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            color: 'var(--color-text-main)',
        },
        newsletter: {
            marginTop: '1rem',
            position: 'relative',
            maxWidth: '300px',
        },
        input: {
            width: '100%',
            padding: '0.8rem 1rem',
            paddingRight: '3rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--glass-border)',
            backgroundColor: 'rgba(255,255,255,0.05)',
            color: 'var(--color-text-main)',
            outline: 'none',
        },
        arrowBtn: {
            position: 'absolute',
            right: '5px',
            top: '5px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--color-secondary)',
        },
        bottomBar: {
            borderTop: '1px solid var(--glass-border)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            color: 'var(--color-text-muted)',
            fontSize: '0.9rem',
        }
    };

    return (
        <footer style={styles.footer}>
            <div className="container">
                <div style={styles.grid}>
                    <div style={styles.brandColumn}>
                        <span style={styles.logo}>Revia.</span>
                        <p style={styles.description}>
                            Reimagining the way you celebrate. From intimate gatherings to grand weddings, we curate the perfect team for your big day.
                        </p>
                        <div style={styles.socials}>
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                                <div key={idx} style={styles.socialIcon}
                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-secondary)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--color-text-main)'; }}>
                                    <Icon size={20} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 style={styles.heading}>Company</h4>
                        <ul style={styles.linkList}>
                            {['About Us', 'Careers', 'Vendors', 'Contact'].map(link => (
                                <li key={link} style={styles.linkItem}>
                                    <a style={styles.link}
                                        onMouseEnter={(e) => { e.target.style.color = 'var(--color-primary)'; e.target.style.paddingLeft = '5px'; }}
                                        onMouseLeave={(e) => { e.target.style.color = 'var(--color-text-muted)'; e.target.style.paddingLeft = '0'; }}>
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 style={styles.heading}>Stay Updated</h4>
                        <p style={{ ...styles.description, marginBottom: '1rem' }}>
                            Subscribe to get the latest trends and inspiration.
                        </p>
                        <div style={styles.newsletter}>
                            <input type="email" placeholder="Your email address" style={styles.input} />
                            <button style={styles.arrowBtn}>
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <div style={styles.bottomBar}>
                    <div>© Revia Inc. All rights reserved.</div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
