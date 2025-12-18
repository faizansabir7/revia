import React from 'react';

const Marquee = ({ children, direction = 'left', speed = 30 }) => {
    const styles = {
        container: {
            overflow: 'hidden',
            display: 'flex',
            whiteSpace: 'nowrap',
            width: '100%',
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        },
        content: {
            display: 'flex',
            animation: `scroll-${direction} ${speed}s linear infinite`,
            minWidth: '100%',
        },
        item: {
            flexShrink: 0,
            padding: '0 2rem',
        }
    };

    return (
        <div style={styles.container}>
            <style>
                {`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          @keyframes scroll-right {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(0); }
          }
        `}
            </style>
            <div style={styles.content}>
                {React.Children.map(children, child => (
                    <div style={styles.item}>{child}</div>
                ))}
                {/* Duplicate content for seamless loop */}
                {React.Children.map(children, child => (
                    <div style={styles.item}>{child}</div>
                ))}
            </div>
        </div>
    );
};

export default Marquee;
