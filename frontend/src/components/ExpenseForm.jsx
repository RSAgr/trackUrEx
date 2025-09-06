import React, { useState } from 'react';
// For XML parsing
import { parseStringPromise } from 'xml2js';

const ExpenseForm = () => {
    const [formData, setFormData] = useState({ 
        user_id: '1', 
        amount: '', 
        category: '', 
        merchant: '', 
        transaction_date: '' 
    });
    
    const [status, setStatus] = useState({ message: '', type: '' });
    const [isSuggesting, setIsSuggesting] = useState(false);
    
    const categories = [
        "Education", "Entertainment", "Food", "Gifts & Donations", "Groceries", 
        "Health & Wellness", "Personal Care", "Rent/Mortgage", "Shopping", 
        "Stationery", "Subscriptions", "Transport", "Travel", "Utilities", "Other"
    ];
    const [xmlStatus, setXmlStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ message: 'Submitting...', type: 'info' });
        
        // Ensure correct types and required fields
        let transactionDateValue = undefined;
        if (formData.transaction_date) {
            const dateObj = new Date(formData.transaction_date);
            if (!isNaN(dateObj.getTime())) {
                transactionDateValue = dateObj.toISOString();
            }
        }
        const dataToSend = {
            user_id: Number(formData.user_id),
            amount: Number(formData.amount),
            category: formData.category,
            merchant: formData.merchant,
            transaction_date: transactionDateValue,
            source: 'manual',
        };
        
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
                let errorMessage = 'Failed to add expense.';
                try {
                    const errorData = await response.json();
                    if (errorData.detail) {
                        errorMessage = errorData.detail;
                    } else if (typeof errorData === 'string') {
                        errorMessage = errorData;
                    } else if (errorData && errorData.message) {
                        errorMessage = errorData.message;
                    }
                } catch (err) {
                    errorMessage = 'Unknown error occurred.';
                }
                setStatus({ message: `Error: ${errorMessage}`, type: 'error' });
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
        const payload = { contents: [{ parts: [{ text: prompt }] }] };
        
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
        <div className="form-container">
            <div className="form-wrapper glass-card shimmer">
                <h2 className="form-title gradient-text">💰 Log a New Expense</h2>
                <p className="form-subtitle">Enter the details of your transaction below.</p>
                
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="user_id" className="form-label">User ID</label>
                            <input 
                                type="number" 
                                id="user_id" 
                                name="user_id" 
                                value={formData.user_id} 
                                onChange={handleChange} 
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount" className="form-label">Amount (₹)</label>
                            <input 
                                type="number" 
                                id="amount" 
                                name="amount" 
                                value={formData.amount} 
                                onChange={handleChange} 
                                required 
                                step="0.01"
                                className="form-input"
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="merchant" className="form-label">Merchant</label>
                        <input 
                            type="text" 
                            id="merchant" 
                            name="merchant" 
                            value={formData.merchant} 
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="category" className="form-label">Category</label>
                        <div className="category-row">
                            <select 
                                id="category" 
                                name="category" 
                                value={formData.category} 
                                onChange={handleChange} 
                                required
                                className="form-select" 
                                style={{flex: 1}}
                            >
                                <option value="">Select a category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <button 
                                type="button" 
                                onClick={handleSuggestCategory} 
                                disabled={isSuggesting || !formData.merchant}
                                className="ai-suggest-btn"
                            >
                                {isSuggesting ? '🤔' : '✨'} AI Suggest
                            </button>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="transaction_date" className="form-label">Transaction Date (Optional)</label>
                        <input 
                            type="date" 
                            id="transaction_date" 
                            name="transaction_date" 
                            value={formData.transaction_date} 
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>
                    
                    <button type="submit" className="form-submit-btn premium-button">
                        💾 Add Expense
                    </button>
                    {/* XML Upload Option */}
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-white mb-2">Or upload your SMS XML history</h3>
                        <input type="file" accept=".xml" onChange={async (e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            setXmlStatus('Parsing XML...');
                            try {
                                const text = await file.text();
                                const result = await parseStringPromise(text);
                                // Example: Parse SMS messages and extract expenses
                                const messages = result.smses && result.smses.sms ? result.smses.sms : [];
                                let count = 0;
                                for (const msg of messages) {
                                    // Example: Parse HDFC/ICICI SMS for expense
                                    const body = msg.$.body || '';
                                    const amountMatch = body.match(/(?:INR|Rs\.?|₹)\s?(\d+[.,]?\d*)/i);
                                    const merchantMatch = body.match(/at\s+([A-Za-z0-9 &]+)/i);
                                    if (amountMatch) {
                                        // You can POST to backend here
                                        count++;
                                    }
                                }
                                setXmlStatus(`Parsed ${count} expense(s) from SMS history.`);
                            } catch (err) {
                                setXmlStatus('Failed to parse XML.');
                            }
                        }} className="block w-full mt-2 text-gray-300" />
                        {xmlStatus && <div className="mt-2 text-sm text-blue-400">{xmlStatus}</div>}
                    </div>
                </form>
                
                {status.message && (
                    <div className={`form-status ${status.type}`}>
                        {status.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpenseForm;
