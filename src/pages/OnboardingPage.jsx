import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, X, Check, Heart, Briefcase, Users, Calendar } from 'lucide-react';
import '../styles/Onboarding.css';

const OnboardingPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        eventType: '',
        location: '',
        guestCount: '',
        date: '',
        budgetRange: 50000
    });

    const totalSteps = 3;

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            // Submit logic - usually send data to backend or local storage
            // passing state to vendors page specifically if needed
            navigate('/vendors', { state: { filter: formData } });
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            navigate('/');
        }
    };

    const handleOptionSelect = (type) => {
        setFormData({ ...formData, eventType: type });
    };

    // Render Steps
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="wizard-step fade-in">
                        <h2>What are we celebrating?</h2>
                        <p>Select the type of event you are planning.</p>
                        <div className="options-grid">
                            <EventCard
                                icon={<Heart size={24} />}
                                title="Wedding"
                                selected={formData.eventType === 'Wedding'}
                                onClick={() => handleOptionSelect('Wedding')}
                            />
                            <EventCard
                                icon={<Users size={24} />}
                                title="Social Gathering"
                                selected={formData.eventType === 'Social Gathering'}
                                onClick={() => handleOptionSelect('Social Gathering')}
                            />
                            <EventCard
                                icon={<Briefcase size={24} />}
                                title="Corporate Event"
                                selected={formData.eventType === 'Corporate Event'}
                                onClick={() => handleOptionSelect('Corporate Event')}
                            />
                            <EventCard
                                icon={<Calendar size={24} />}
                                title="Birthday / Party"
                                selected={formData.eventType === 'Birthday'}
                                onClick={() => handleOptionSelect('Birthday')}
                            />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="wizard-step fade-in">
                        <h2>The Essentials</h2>
                        <p>Tell us a bit more about your requirements.</p>

                        <div className="form-group">
                            <label>Event Location (City)</label>
                            <input
                                type="text"
                                className="styled-input"
                                placeholder="e.g. Mumbai, Delhi, Bangalore"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Approximate Guest Count</label>
                            <input
                                type="number"
                                className="styled-input"
                                placeholder="e.g. 150"
                                value={formData.guestCount}
                                onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                            />
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="wizard-step fade-in">
                        <h2>Set Your Budget</h2>
                        <p>This helps us recommend vendors in your range.</p>

                        <div className="budget-value-display">
                            ₹ {formData.budgetRange.toLocaleString()} +
                        </div>

                        <div className="budget-slide-container">
                            <input
                                type="range"
                                min="10000"
                                max="500000"
                                step="5000"
                                value={formData.budgetRange}
                                onChange={(e) => setFormData({ ...formData, budgetRange: parseInt(e.target.value) })}
                                style={{
                                    width: '100%',
                                    accentColor: 'var(--color-primary)',
                                    cursor: 'pointer'
                                }}
                            />
                        </div>
                        <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Move the slider to adjust your estimated budget.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    const progressPercentage = (step / totalSteps) * 100;

    return (
        <div className="onboarding-container">
            {/* Header */}
            <div className="onboarding-header">
                <a href="/" className="brand-logo">REV<span style={{ color: '#fff' }}>IA</span></a>
                <button className="close-btn" onClick={() => navigate('/')}><X /></button>
            </div>

            {/* Progress Bar */}
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
            </div>

            {/* Content */}
            <div className="wizard-content">
                {renderStep()}

                {/* Navigation */}
                <div className="wizard-nav">
                    <button className="nav-btn" onClick={handleBack}>
                        {step === 1 ? 'Cancel' : 'Back'}
                    </button>
                    <button className="nav-btn primary" onClick={handleNext}>
                        {step === totalSteps ? 'Show Vendors' : 'Next'} <ArrowRight size={16} style={{ marginLeft: '0.5rem', display: 'inline' }} />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Helper Component for Cards
const EventCard = ({ icon, title, selected, onClick }) => (
    <div className={`option-card ${selected ? 'selected' : ''}`} onClick={onClick}>
        {icon}
        <h3>{title}</h3>
        {selected && <div style={{ position: 'absolute', top: '10px', right: '10px', color: 'var(--color-primary)' }}><Check size={20} /></div>}
    </div>
);

export default OnboardingPage;
