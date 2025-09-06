import React from 'react';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

const HeroSection = ({ onNavigate }) => {
    const AnimatedH1 = ({ children }) => {
        const [ref, isVisible] = useAnimateOnScroll({ threshold: 0.5, triggerOnce: true });
        return (
            <h1 
                ref={ref} 
                className="hero-title" 
                style={{
                    transition: 'all 0.7s',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                }}
            >
                {children}
            </h1>
        );
    };

    const AnimatedP = ({ children }) => {
        const [ref, isVisible] = useAnimateOnScroll({ threshold: 0.5, triggerOnce: true });
        return (
            <p 
                ref={ref} 
                className="hero-subtitle" 
                style={{
                    transition: 'all 0.7s 0.2s',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                }}
            >
                {children}
            </p>
        );
    };

    const AnimatedDiv = ({ children }) => {
        const [ref, isVisible] = useAnimateOnScroll({ threshold: 0.5, triggerOnce: true });
        return (
            <div 
                ref={ref} 
                className="hero-button" 
                style={{
                    transition: 'all 0.7s 0.3s',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                }}
            >
                {children}
            </div>
        );
    };

    return (
        <div className="hero">
            <HeroBackgroundGraphic />
            <div className="container" style={{position: 'relative', zIndex: 10}}>
                <AnimatedH1>
                    <span className="gradient-text">Master Your Money,</span>
                    <br />
                    <span style={{color: 'white'}}>Effortlessly.</span>
                </AnimatedH1>
                <AnimatedP>
                    IntelliSpend is a comprehensive, AI-powered platform designed to revolutionize personal finance. 
                    We make managing your money fun, intuitive, and highly effective through smart insights and gamified goals.
                </AnimatedP>
                <AnimatedDiv>
                    <button onClick={() => onNavigate('expenses')} className="premium-button pulse-glow">
                        🚀 Add First Expense
                    </button>
                </AnimatedDiv>

                <div className="features-grid">
                    <AnimatedCard delay={0}>
                        <div className="glass-card feature-card floating-animation">
                            <InsightIcon />
                            <h3 className="feature-title gradient-text">Insightful Visualization</h3>
                            <p className="feature-description">
                                Connect to an interactive dashboard to get clear, actionable insights into your spending habits.
                            </p>
                        </div>
                    </AnimatedCard>
                    <AnimatedCard delay={150}>
                        <div className="glass-card feature-card floating-animation" style={{animationDelay: '2s'}}>
                            <GamifyIcon />
                            <h3 className="feature-title gradient-text">Gamified Experience</h3>
                            <p className="feature-description">
                                Earn points, unlock achievements, and climb leaderboards by staying on top of your finances.
                            </p>
                        </div>
                    </AnimatedCard>
                    <AnimatedCard delay={300}>
                         <div className="glass-card feature-card floating-animation" style={{animationDelay: '4s'}}>
                            <AssistantIcon />
                            <h3 className="feature-title gradient-text">AI-Powered Guidance</h3>
                            <p className="feature-description">
                                Our chatbot assistant provides personalized money-saving tips and guides you through the app.
                            </p>
                        </div>
                    </AnimatedCard>
                </div>
            </div>
        </div>
    );
};

// Helper Components
const AnimatedCard = ({ children, delay }) => {
    const [ref, isVisible] = useAnimateOnScroll({ threshold: 0.1, triggerOnce: true });
    return (
        <div 
            ref={ref}
            className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const HeroBackgroundGraphic = () => (
    <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: -10,
        overflow: 'hidden'
    }} aria-hidden="true">
        <svg style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200%',
            height: '200%',
            opacity: 0.4
        }} viewBox="0 0 1024 1024">
            <defs>
                <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" style={{stopColor: 'rgba(79, 70, 229, 0.6)'}} />
                    <stop offset="100%" style={{stopColor: 'rgba(79, 70, 229, 0)'}} />
                </radialGradient>
                 <radialGradient id="grad2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" style={{stopColor: 'rgba(0, 212, 255, 0.4)'}} />
                    <stop offset="100%" style={{stopColor: 'rgba(0, 212, 255, 0)'}} />
                </radialGradient>
            </defs>
            <circle cx="200" cy="300" r="400" fill="url(#grad1)" />
            <circle cx="800" cy="700" r="350" fill="url(#grad2)" />
        </svg>
    </div>
);

const InsightIcon = () => (
    <div className="feature-icon" style={{background: 'rgba(6, 182, 212, 0.2)', borderColor: 'rgba(6, 182, 212, 0.3)'}}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width: '1.5rem', height: '1.5rem', color: '#67e8f9'}}>
            <path d="M4 12C4 12 5.6 7 12 7C18.4 7 20 12 20 12C20 12 18.4 17 12 17C5.6 17 4 12 4 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
);

const GamifyIcon = () => (
    <div className="feature-icon" style={{background: 'rgba(147, 51, 234, 0.2)', borderColor: 'rgba(147, 51, 234, 0.3)'}}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width: '1.5rem', height: '1.5rem', color: '#c4b5fd'}}>
            <path d="M12 2L9.75 9.75L2 12L9.75 14.25L12 22L14.25 14.25L22 12L14.25 9.75L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 2L6 5L9 6L6 7L5 10L4 7L1 6L4 5L5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19 10L18 13L15 14L18 15L19 18L20 15L23 14L20 13L19 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
);

const AssistantIcon = () => (
    <div className="feature-icon" style={{background: 'rgba(59, 130, 246, 0.2)', borderColor: 'rgba(59, 130, 246, 0.3)'}}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width: '1.5rem', height: '1.5rem', color: '#93c5fd'}}>
            <path d="M17 9V7C17 5.14348 16.2625 3.36301 14.9497 2.05025C13.637 0.737498 11.8565 0 10 0C8.14348 0 6.36301 0.737498 5.05025 2.05025C3.7375 3.36301 3 5.14348 3 7V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 13V19C21 20.0609 20.5786 21.0783 19.8284 21.8284C19.0783 22.5786 18.0609 23 17 23H7C5.93913 23 4.92172 22.5786 4.17157 21.8284C3.42143 21.0783 3 20.0609 3 19V13C3 11.9391 3.42143 10.9217 4.17157 10.1716C4.92172 9.42143 5.93913 9 7 9H17C18.0609 9 19.0783 9.42143 19.8284 10.1716C20.5786 10.9217 21 11.9391 21 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
);

export default HeroSection;
