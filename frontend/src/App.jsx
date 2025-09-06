import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ExpenseForm from './components/ExpenseForm';
import Profile from './components/Profile';
import Rewards from './components/Rewards';
import ChatbotSidebar from './components/ChatbotSidebar';
import Footer from './components/Footer';
import PlaceholderPage from './components/PlaceholderPage';
import './App.css';
import './components/Profile.css';
import './components/Rewards.css';

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

export default function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const handleLogin = async (formData, setStatus) => {
        setStatus({ message: 'Logging in...', type: 'info' });
        try {
            const response = await fetch('http://localhost:8000/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const userData = await response.json();
                setStatus({ message: 'Login successful! Redirecting...', type: 'success' });
                setTimeout(() => {
                    setCurrentUser(userData);
                    setCurrentPage('dashboard');
                }, 1000);
            } else {
                const errorData = await response.json();
                setStatus({ message: `Login failed: ${errorData.detail}`, type: 'error' });
            }
        } catch (error) {
            setStatus({ message: 'Could not connect to the server.', type: 'error' });
        }
    };

    const handleSignup = async (formData, setStatus) => {
        setStatus({ message: 'Creating account...', type: 'info' });
        try {
            const response = await fetch('http://localhost:8000/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const newUser = await response.json();
                setStatus({ message: 'Signup successful! Logging you in...', type: 'success' });
                setTimeout(() => {
                    setCurrentUser(newUser);
                    setCurrentPage('dashboard');
                }, 1000);
            } else {
                const errorData = await response.json();
                setStatus({ message: `Signup failed: ${errorData.detail}`, type: 'error' });
            }
        } catch (error) {
            setStatus({ message: 'Could not connect to the server.', type: 'error' });
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setCurrentPage('home');
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HeroSection onNavigate={setCurrentPage} />;
            case 'expenses':
                return <ExpenseForm currentUser={currentUser} onNavigate={setCurrentPage} />;
            case 'add_expense':
                return <ExpenseForm currentUser={currentUser} onNavigate={setCurrentPage} />;
            case 'login':
                return <AuthForm title="Log In" fields={[{name: 'username', label: 'Username', type: 'text'}, {name: 'email', label: 'Email Address', type: 'email'}]} buttonText="Log In" onSubmit={handleLogin} onNavigate={setCurrentPage} />;
            case 'signup':
                return <AuthForm title="Create an Account" fields={[{name: 'username', label: 'Username', type: 'text'}, {name: 'email', label: 'Email Address', type: 'email'}]} buttonText="Sign Up" onSubmit={handleSignup} onNavigate={setCurrentPage} isSignUp={true} />;
            case 'dashboard':
                return <PlaceholderPage title={`Welcome, ${currentUser?.username || ''}!`} />;
            case 'rewards':
                return <Rewards />;
            case 'profile':
                return <Profile />;
            default:
                return <HeroSection onNavigate={setCurrentPage} />;
        }
    };

    return (
        <div className="bg-black text-white min-h-screen font-sans relative">
            <GlobalStyles />
            <div className="absolute inset-0 -z-20 animated-gradient-background"></div>
            <div className="absolute inset-0 -z-10 bg-black/60"></div>
            <Header currentPage={currentPage} onNavigate={setCurrentPage} />
            <main className={`transition-all duration-300 ease-in-out ${isChatOpen ? 'md:mr-96' : 'mr-0'}`}> 
                {renderPage()}
            </main>
            <Footer />
            <ChatbotSidebar isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
            <button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50">
                <svg style={{width: '1.5rem', height: '1.5rem'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
    );
}
