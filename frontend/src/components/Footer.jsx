import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="footer-title gradient-text">💰 IntelliSpend</h3>
                        <p className="footer-description">
                            Your AI-powered financial companion for smarter money management.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link" aria-label="Twitter">
                                <XIcon />
                            </a>
                            <a href="#" className="social-link" aria-label="Instagram">
                                <InstagramIcon />
                            </a>
                            <a href="#" className="social-link" aria-label="Email">
                                <MailIcon />
                            </a>
                        </div>
                    </div>
                    
                    <div className="footer-section">
                        <h4 className="footer-section-title">Features</h4>
                        <ul className="footer-links">
                            <li><a href="#" className="footer-link">💳 Expense Tracking</a></li>
                            <li><a href="#" className="footer-link">🎯 Goal Setting</a></li>
                            <li><a href="#" className="footer-link">📊 Analytics</a></li>
                            <li><a href="#" className="footer-link">🏆 Rewards</a></li>
                        </ul>
                    </div>
                    
                    <div className="footer-section">
                        <h4 className="footer-section-title">Company</h4>
                        <ul className="footer-links">
                            <li><a href="#" className="footer-link">About Us</a></li>
                            <li><a href="#" className="footer-link">Privacy Policy</a></li>
                            <li><a href="#" className="footer-link">Terms of Service</a></li>
                            <li><a href="#" className="footer-link">Contact</a></li>
                        </ul>
                    </div>
                    
                    <div className="footer-section">
                        <h4 className="footer-section-title">Resources</h4>
                        <ul className="footer-links">
                            <li><a href="#" className="footer-link">Help Center</a></li>
                            <li><a href="#" className="footer-link">Blog</a></li>
                            <li><a href="#" className="footer-link">API Documentation</a></li>
                            <li><a href="#" className="footer-link">Community</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © 2025 IntelliSpend. All rights reserved. Made with ❤️ for better financial wellness.
                    </p>
                </div>
            </div>
        </footer>
    );
};

// Icon Components
const XIcon = () => (
    <svg style={{width: '1.5rem', height: '1.5rem'}} fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const InstagramIcon = () => (
    <svg style={{width: '1.5rem', height: '1.5rem'}} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.012-3.584.07-4.85c.148-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.059 1.689.073 4.948.073s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
    </svg>
);

const MailIcon = () => (
    <svg style={{width: '1.5rem', height: '1.5rem'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);

export default Footer;
