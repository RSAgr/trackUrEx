import React, { useState, useEffect, useRef } from 'react';

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
        
        const prompt = `You are a helpful financial assistant for IntelliSpend, a personal finance management app. The user said: "${input}". Please provide helpful, concise financial advice or guidance. Keep responses under 100 words and friendly.`;
        
        const payload = {
            contents: [{ parts: [{ text: prompt }] }]
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
        <div className={`chatbot-sidebar ${isOpen ? 'open' : 'closed'}`}>
             <div className="chatbot-container">
                <div className="chatbot-header">
                    <h3 className="chatbot-title">
                        <SparklesIcon /> Money Guide
                    </h3>
                    <button onClick={onClose} className="chatbot-close">
                        &times;
                    </button>
                </div>
                
                <div className="chatbot-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.role}`}>
                            <div className="message-bubble">
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                         <div className="message model">
                            <div className="message-bubble loading">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                
                <form onSubmit={handleSendMessage} className="chatbot-input-form">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me about your finances..."
                        className="chatbot-input"
                        disabled={isLoading}
                    />
                    <button 
                        type="submit" 
                        disabled={isLoading || !input.trim()}
                        className="chatbot-send-btn"
                    >
                        📤
                    </button>
                </form>
            </div>
        </div>
    );
};

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '1.25rem', height: '1.25rem'}}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.553L16.5 21.75l-.398-1.197a3.375 3.375 0 00-2.455-2.455L12.75 18l1.197-.398a3.375 3.375 0 002.455-2.455l.398-1.197.398 1.197a3.375 3.375 0 002.455 2.455l1.197.398-1.197.398a3.375 3.375 0 00-2.455 2.455z" />
    </svg>
);

export default ChatbotSidebar;
