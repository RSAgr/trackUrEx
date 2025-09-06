import React, { useState, useEffect } from 'react';

const ExpensesPage = ({ currentUser, onNavigate }) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const userId = currentUser?.user_id || 1; // Default to user_id 1 if not logged in
        setLoading(true);
        fetch(`http://localhost:8000/expenses/${userId}`)
            .then(res => {
                if (!res.ok) { throw new Error("Network response was not ok"); }
                return res.json();
            })
            .then(data => { setExpenses(data); })
            .catch(err => {
                setError("Failed to fetch expenses. Is the backend server running?");
            })
            .finally(() => { setLoading(false); });
    }, [currentUser]);

    return (
        <div className="py-24 sm:py-32 container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-8">All Your Transactions</h2>
                {loading && <p className="text-center text-gray-400">Loading expenses...</p>}
                {error && <p className="text-center text-red-400">{error}</p>}
                {!loading && !error && (
                    <div className="bg-black/30 border border-white/10 rounded-2xl shadow-lg backdrop-blur-md overflow-hidden">
                        <ul className="divide-y divide-white/10">
                            {expenses.length > 0 ? expenses.map(exp => (
                                <li key={exp.user_expense_id} className="p-4 flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <span className="text-gray-500 font-mono text-sm w-8 text-center">{exp.user_expense_id}</span>
                                        <div>
                                            <p className="font-bold text-white">{exp.merchant || 'N/A'}</p>
                                            <p className="text-sm text-gray-400">{exp.category}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-white">-₹{parseFloat(exp.amount).toFixed(2)}</p>
                                        <p className="text-sm text-gray-500 text-right">{new Date(exp.transaction_date).toLocaleDateString()}</p>
                                    </div>
                                </li>
                            )) : (
                                <li className="p-6 text-center text-gray-400">No expenses logged yet.</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpensesPage;
