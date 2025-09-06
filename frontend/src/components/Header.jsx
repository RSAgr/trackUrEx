import React from 'react';

const Header = ({ onNavigate, currentPage }) => {
    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    {/* Left Side */}
                    <div className="nav-left">
                        <a 
                            href="#" 
                            onClick={(e) => { e.preventDefault(); onNavigate('home'); }} 
                            className="brand gradient-text"
                        >
                            💰 IntelliSpend
                        </a>
                        <nav className="nav-desktop">
                            <a 
                                href="#" 
                                onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }} 
                                className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
                            >
                                📊 Dashboard
                            </a>
                            <a 
                                href="#" 
                                onClick={(e) => { e.preventDefault(); onNavigate('expenses'); }} 
                                className={`nav-link ${currentPage === 'expenses' ? 'active' : ''}`}
                            >
                                💳 Expenses
                            </a>
                            <a 
                                href="#" 
                                onClick={(e) => { e.preventDefault(); onNavigate('rewards'); }} 
                                className={`nav-link ${currentPage === 'rewards' ? 'active' : ''}`}
                            >
                                🎁 Rewards
                            </a>
                            <a 
                                href="#" 
                                onClick={(e) => { e.preventDefault(); onNavigate('profile'); }} 
                                className={`nav-link ${currentPage === 'profile' ? 'active' : ''}`}
                            >
                                👤 Profile
                            </a>
                        </nav>
                    </div>
                    {/* Right Side */}
                    <div className="nav-right">
                        <a href="#" className="premium-button" style={{fontSize: '0.875rem', padding: '0.5rem 1rem', display: 'none'}}>
                            ✨ Premium
                        </a>
                        <a href="#" className="nav-link">Log In</a>
                        <a href="#" style={{
                            background: 'white', 
                            color: '#111827', 
                            padding: '0.5rem 1rem', 
                            borderRadius: '0.5rem', 
                            textDecoration: 'none', 
                            fontWeight: '600', 
                            fontSize: '0.875rem', 
                            transition: 'all 0.2s'
                        }}>
                            Sign Up
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
