import React, { useState, useEffect, useRef } from 'react';

// --- Global Styles for Animations ---
// Injects a <style> tag for the animated background and pop-in effects.
const GlobalStyles = () => (
    <style>{`
        @keyframes background-pan {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .animated-gradient-background {
            background: linear-gradient(120deg, hsl(235, 100%, 8%), hsl(260, 100%, 15%), hsl(210, 100%, 10%), hsl(260, 100%, 15%), hsl(235, 100%, 8%));
            background-size: 400% 400%;
            animation: background-pan 25s ease infinite;
        }

        @keyframes pop-in {
            0% {
                opacity: 0;
                transform: translateY(20px) scale(0.98);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `}</style>
);

// Custom hook to trigger animations when elements enter the viewport.
const useAnimateOnScroll = (options) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);

    return [ref, isVisible];
};


// --- SVG Icon Components ---
// Standard navigation and UI icons.
const UserCircleIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const ChartBarIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
);

const CreditCardIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 21z" />
    </svg>
);

const GiftIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 19.5v-8.25M12 4.875A2.625 2.625 0 1014.625 7.5H9.375A2.625 2.625 0 1012 4.875zM21 11.25H3v1.875h18v-1.875z" />
    </svg>
);

const ChatBubbleIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const SparklesIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.553L16.5 21.75l-.398-1.197a3.375 3.375 0 00-2.455-2.455L12.75 18l1.197-.398a3.375 3.375 0 002.455-2.455l.398-1.197.398 1.197a3.375 3.375 0 002.455 2.455l1.197.398-1.197.398a3.375 3.375 0 00-2.455 2.455z" />
    </svg>
);

const XIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const InstagramIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.012-3.584.07-4.85c.148-3.225 1.664 4.771 4.919 4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.059 1.689.073 4.948.073s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
    </svg>
);

const MailIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);

// --- Langflow Inspired Graphics ---
const HeroBackgroundGraphic = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] md:w-[120%] md:h-[120%] opacity-40" viewBox="0 0 1024 1024">
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
    <div className="mb-4 h-12 w-12 rounded-lg bg-cyan-900/50 flex items-center justify-center border border-cyan-500/30">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-cyan-300">
            <path d="M4 12C4 12 5.6 7 12 7C18.4 7 20 12 20 12C20 12 18.4 17 12 17C5.6 17 4 12 4 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
);
const GamifyIcon = () => (
    <div className="mb-4 h-12 w-12 rounded-lg bg-purple-900/50 flex items-center justify-center border border-purple-500/30">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-300">
            <path d="M12 2L9.75 9.75L2 12L9.75 14.25L12 22L14.25 14.25L22 12L14.25 9.75L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 2L6 5L9 6L6 7L5 10L4 7L1 6L4 5L5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19 10L18 13L15 14L18 15L19 18L20 15L23 14L20 13L19 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
);
const AssistantIcon = () => (
    <div className="mb-4 h-12 w-12 rounded-lg bg-blue-900/50 flex items-center justify-center border border-blue-500/30">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-300">
            <path d="M17 9V7C17 5.14348 16.2625 3.36301 14.9497 2.05025C13.637 0.737498 11.8565 0 10 0C8.14348 0 6.36301 0.737498 5.05025 2.05025C3.7375 3.36301 3 5.14348 3 7V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 13V19C21 20.0609 20.5786 21.0783 19.8284 21.8284C19.0783 22.5786 18.0609 23 17 23H7C5.93913 23 4.92172 22.5786 4.17157 21.8284C3.42143 21.0783 3 20.0609 3 19V13C3 11.9391 3.42143 10.9217 4.17157 10.1716C4.92172 9.42143 5.93913 9 7 9H17C18.0609 9 19.0783 9.42143 19.8284 10.1716C20.5786 10.9217 21 11.9391 21 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
);

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

// --- Header Component ---
const Header = ({ onNavigate }) => {
    return (
        <header className="fixed top-0 left-0 w-full bg-black/30 backdrop-blur-md z-50 border-b border-white/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left Side */}
                    <div className="flex items-center space-x-8">
                        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="text-2xl font-bold text-white tracking-wider">
                            IntelliSpend
                        </a>
                        <nav className="hidden md:flex items-center space-x-6">
                            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }} className="text-gray-300 hover:text-white transition-colors duration-200">Dashboard</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('expenses'); }} className="text-gray-300 hover:text-white transition-colors duration-200">Expenses</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('rewards'); }} className="text-gray-300 hover:text-white transition-colors duration-200">Rewards</a>
                             <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('profile'); }} className="text-gray-300 hover:text-white transition-colors duration-200">Profile</a>
                        </nav>
                    </div>
                    {/* Right Side */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <a href="#" className="hidden sm:inline-block px-4 py-2 rounded-md text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.7)] hover:opacity-90 transition-all duration-300 transform hover:scale-105">
                            Premium
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors px-3 py-2 text-sm">Log In</a>
                        <a href="#" className="bg-gray-200 text-gray-900 px-4 py-2 rounded-md text-sm font-semibold hover:bg-white transition-colors">Sign Up</a>
                    </div>
                </div>
            </div>
        </header>
    );
};

// --- Hero Section (Home Page) ---
const HeroSection = ({ onNavigate }) => {
    const AnimatedH1 = ({ children }) => {
        const [ref, isVisible] = useAnimateOnScroll({ threshold: 0.5, triggerOnce: true });
        return <h1 ref={ref} className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>{children}</h1>;
    };

    const AnimatedP = ({ children }) => {
        const [ref, isVisible] = useAnimateOnScroll({ threshold: 0.5, triggerOnce: true });
        return <p ref={ref} className={`mt-6 max-w-2xl mx-auto text-lg text-gray-300 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>{children}</p>;
    };

    const AnimatedDiv = ({ children }) => {
        const [ref, isVisible] = useAnimateOnScroll({ threshold: 0.5, triggerOnce: true });
        return <div ref={ref} className={`mt-10 flex justify-center gap-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>{children}</div>;
    };

    return (
        <div className="relative pt-32 pb-20 sm:pt-48 sm:pb-32 overflow-hidden">
            <HeroBackgroundGraphic />
            <div className="container mx-auto px-4 text-center relative z-10">
                <AnimatedH1>Master Your Money, Effortlessly.</AnimatedH1>
                <AnimatedP>
                    IntelliSpend is a comprehensive, AI-powered platform designed to revolutionize personal finance. We make managing your money fun, intuitive, and highly effective through smart insights and gamified goals.
                </AnimatedP>
                <AnimatedDiv>
                    <button onClick={() => onNavigate('expenses')} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                        Add First Expense
                    </button>
                </AnimatedDiv>

                <div className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <AnimatedCard delay={0}>
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-lg shadow-2xl h-full transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/10">
                            <InsightIcon />
                            <h3 className="text-xl font-bold text-white">Insightful Visualization</h3>
                            <p className="mt-2 text-gray-400">Connect to an interactive dashboard to get clear, actionable insights into your spending habits.</p>
                        </div>
                    </AnimatedCard>
                    <AnimatedCard delay={150}>
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-lg shadow-2xl h-full transition-all duration-300 hover:border-purple-400/50 hover:bg-white/10">
                            <GamifyIcon />
                            <h3 className="text-xl font-bold text-white">Gamified Experience</h3>
                            <p className="mt-2 text-gray-400">Earn points, unlock achievements, and climb leaderboards by staying on top of your finances.</p>
                        </div>
                    </AnimatedCard>
                    <AnimatedCard delay={300}>
                         <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-lg shadow-2xl h-full transition-all duration-300 hover:border-blue-400/50 hover:bg-white/10">
                            <AssistantIcon />
                            <h3 className="text-xl font-bold text-white">AI-Powered Guidance</h3>
                            <p className="mt-2 text-gray-400">Our chatbot assistant provides personalized money-saving tips and guides you through the app.</p>
                        </div>
                    </AnimatedCard>
                </div>
            </div>
        </div>
    );
};

// --- Expense Form Component ---
const ExpenseForm = () => {
    const [formData, setFormData] = useState({ user_id: '1', amount: '', category: '', merchant: '', transaction_date: '' });
    const [status, setStatus] = useState({ message: '', type: '' });
    const [isSuggesting, setIsSuggesting] = useState(false);
    const categories = ["Education", "Entertainment", "Food", "Gifts & Donations", "Groceries", "Health & Wellness", "Personal Care", "Rent/Mortgage", "Shopping", "Stationery", "Subscriptions", "Transport", "Travel", "Utilities", "Other"];
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ message: 'Submitting...', type: 'info' });
        const dataToSend = { ...formData };
        if (!dataToSend.transaction_date) {
            delete dataToSend.transaction_date;
        } else {
            dataToSend.transaction_date = new Date(dataToSend.transaction_date).toISOString();
        }
        try {
            const response = await fetch('http://localhost:8000/expenses/manual/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend)
            });
            if (response.ok) {
                const result = await response.json();
                setStatus({ message: `Success! Expense added with ID: ${result.expense_id}`, type: 'success' });
                setFormData({ user_id: '1', amount: '', category: '', merchant: '', transaction_date: '' });
            } else {
                const errorData = await response.json();
                setStatus({ message: `Error: ${errorData.detail || 'Failed to add expense.'}`, type: 'error' });
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus({ message: 'Could not connect to the server. Please check if the API is running.', type: 'error' });
        }
    };
    const handleSuggestCategory = async () => {
        if (!formData.merchant) {
            setStatus({ message: 'Please enter a merchant first.', type: 'error' });
            return;
        }
        setIsSuggesting(true);
        setStatus({ message: '✨ Asking AI for a category suggestion...', type: 'info' });
        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        const prompt = `Given the merchant name "${formData.merchant}", what is the most likely expense category? Choose exactly one from this list: ${categories.join(', ')}. Respond with only the category name and nothing else.`;
        const payload = { contents: [{ parts: [{ text: prompt }] }], };
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (result.candidates && result.candidates.length > 0) {
                const suggestedCategory = result.candidates[0].content.parts[0].text.trim();
                if (categories.includes(suggestedCategory)) {
                    setFormData(prev => ({ ...prev, category: suggestedCategory }));
                    setStatus({ message: `AI suggested: ${suggestedCategory}`, type: 'success' });
                } else {
                    setStatus({ message: `AI suggested an invalid category: "${suggestedCategory}". Please select manually.`, type: 'error' });
                }
            } else {
                setStatus({ message: 'AI could not suggest a category. Please select manually.', type: 'error' });
            }
        } catch (error) {
            console.error('Gemini API error:', error);
            setStatus({ message: 'Error connecting to the AI service.', type: 'error' });
        } finally {
            setIsSuggesting(false);
        }
    };

    return (
        <div className="py-24 sm:py-32">
            <div className="max-w-2xl mx-auto p-8 bg-black/30 border border-white/10 rounded-2xl shadow-lg backdrop-blur-md">
                <h2 className="text-3xl font-bold text-white mb-2">Log a New Expense</h2>
                <p className="text-gray-400 mb-8">Enter the details of your transaction below.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="user_id" className="block text-sm font-medium text-gray-300">User ID</label>
                            <input type="number" id="user_id" name="user_id" value={formData.user_id} onChange={handleChange} required
                                   className="mt-1 block w-full px-4 py-3 bg-gray-900/50 border border-white/20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white"/>
                        </div>
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-300">Amount (₹)</label>
                            <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} required step="0.01"
                                   className="mt-1 block w-full px-4 py-3 bg-gray-900/50 border border-white/20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="merchant" className="block text-sm font-medium text-gray-300">Merchant</label>
                        <input type="text" id="merchant" name="merchant" value={formData.merchant} onChange={handleChange}
                               className="mt-1 block w-full px-4 py-3 bg-gray-900/50 border border-white/20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white"/>
                    </div>
                     <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                        <div className="flex items-center gap-2">
                             <select id="category" name="category" value={formData.category} onChange={handleChange} required
                                className="block w-full px-4 py-3 bg-gray-900/50 border border-white/20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white">
                                <option value="">Select a category</option>
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                            <button type="button" onClick={handleSuggestCategory} disabled={!formData.merchant || isSuggesting} className="flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors whitespace-nowrap">
                               <SparklesIcon />
                               <span>{isSuggesting ? "..." : "Suggest"}</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="transaction_date" className="block text-sm font-medium text-gray-300">Transaction Date (Optional)</label>
                        <input type="datetime-local" id="transaction_date" name="transaction_date" value={formData.transaction_date} onChange={handleChange}
                               className="mt-1 block w-full px-4 py-3 bg-gray-900/50 border border-white/20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white"/>
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-all duration-200">
                            Add Expense
                        </button>
                    </div>
                </form>
                {status.message && (
                    <div className={`mt-6 p-4 rounded-lg text-center font-medium ${
                        status.type === 'success' ? 'bg-green-500/20 text-green-300' :
                        status.type === 'error' ? 'bg-red-500/20 text-red-300' :
                        'bg-blue-500/20 text-blue-300'
                    }`}>
                        {status.message}
                    </div>
                )}
            </div>
        </div>
    );
};


// --- Placeholder Page Component ---
const PlaceholderPage = ({ title }) => (
    <div className="py-32 text-center text-white">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="mt-4 text-gray-400">This page is under construction.</p>
    </div>
);

// --- Chatbot Sidebar Component ---
const ChatbotSidebar = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { role: 'model', text: 'Hi! I am your IntelliSpend financial assistant. How can I help you manage your finances today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        const conversationHistory = messages.map(msg => ({
            role: msg.role === 'model' ? 'model' : 'user',
            parts: [{ text: msg.text }]
        }));
        
        const payload = {
            contents: [...conversationHistory, { role: 'user', parts: [{ text: input }] }],
            systemInstruction: {
                parts: [{ text: "You are a friendly and helpful financial assistant for an app called IntelliSpend. Your goal is to provide concise, helpful advice on personal finance, budgeting, and saving money. You should also be able to guide users on how to use the IntelliSpend app. Keep your answers brief and to the point." }]
            }
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            
            if (result.candidates && result.candidates.length > 0) {
                const modelMessage = { role: 'model', text: result.candidates[0].content.parts[0].text };
                setMessages(prev => [...prev, modelMessage]);
            } else {
                 setMessages(prev => [...prev, { role: 'model', text: "I'm sorry, I couldn't process that. Please try again." }]);
            }

        } catch (error) {
            console.error('Gemini API error:', error);
            setMessages(prev => [...prev, { role: 'model', text: 'There was an error connecting to the AI service. Please check your connection.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`fixed top-0 right-0 h-full bg-gray-900/80 backdrop-blur-lg border-l border-white/10 z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-full md:w-96`}>
             <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2"><SparklesIcon /> Money Guide</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
                </div>
                
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`rounded-lg p-3 max-w-xs text-white ${msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex justify-start">
                            <div className="bg-gray-700 rounded-lg p-3 max-w-xs text-white">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                
                <div className="p-4 border-t border-white/10 flex-shrink-0">
                    <form onSubmit={handleSendMessage}>
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a question..." 
                            className="w-full bg-gray-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isLoading}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

// --- Footer Component ---
const Footer = () => (
    <footer className="bg-black/50 border-t border-white/10 relative z-10">
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <p className="text-gray-400">&copy; {new Date().getFullYear()} IntelliSpend. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 sm:mt-0">
                    <a href="#" className="text-gray-400 hover:text-white"><XIcon /></a>
                    <a href="#" className="text-gray-400 hover:text-white"><InstagramIcon /></a>
                    <a href="#" className="text-gray-400 hover:text-white"><MailIcon /></a>
                    <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
                </div>
            </div>
        </div>
    </footer>
);


// --- Main App Component ---
export default function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [isChatOpen, setIsChatOpen] = useState(false);

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HeroSection onNavigate={setCurrentPage} />;
            case 'expenses':
                return <ExpenseForm />;
            case 'dashboard':
                return <PlaceholderPage title="Dashboard" />;
            case 'rewards':
                return <PlaceholderPage title="Rewards" />;
            case 'profile':
                return <PlaceholderPage title="User Profile" />;
            default:
                return <HeroSection onNavigate={setCurrentPage} />;
        }
    };
    
    return (
        <div className="bg-black text-white min-h-screen font-sans relative">
            <GlobalStyles />
            <div className="absolute inset-0 -z-20 animated-gradient-background"></div>
            <div className="absolute inset-0 -z-10 bg-black/60"></div>
            
            <Header onNavigate={setCurrentPage} />
            <main className={`transition-all duration-300 ease-in-out ${isChatOpen ? 'md:mr-96' : 'mr-0'}`}>
                {renderPage()}
            </main>
            <Footer />
            <ChatbotSidebar isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
            
            <button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50">
                <ChatBubbleIcon />
            </button>
        </div>
    );
}