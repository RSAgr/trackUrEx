import React, { useState } from 'react';

const AuthForm = ({ title, fields, buttonText, onSubmit, onNavigate, isSignUp = false }) => {
    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
    );
    const [status, setStatus] = useState({ message: '', type: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData, setStatus);
    };

    return (
        <div className="py-24 sm:py-32">
            <div className="max-w-md mx-auto p-8 bg-black/30 border border-white/10 rounded-2xl shadow-lg backdrop-blur-md">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">{title}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {fields.map(field => (
                        <div key={field.name}>
                            <label htmlFor={field.name} className="block text-sm font-medium text-gray-300">{field.label}</label>
                            <input type={field.type} id={field.name} name={field.name} value={formData[field.name]} onChange={handleChange} required className="mt-1 block w-full px-4 py-3 bg-gray-900/50 border border-white/20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white"/>
                        </div>
                    ))}
                    <div>
                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200">
                            {buttonText}
                        </button>
                    </div>
                </form>
                {status.message && (
                    <div className={`mt-6 p-4 rounded-lg text-center font-medium ${status.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>{status.message}</div>
                )}
                <p className="mt-6 text-center text-gray-400">
                    {isSignUp ? "Already have an account? " : "Don't have an account? "}
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(isSignUp ? 'login' : 'signup'); }} className="font-semibold text-blue-400 hover:text-blue-300">
                        {isSignUp ? "Log In" : "Sign Up"}
                    </a>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
