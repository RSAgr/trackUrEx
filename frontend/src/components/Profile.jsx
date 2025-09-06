import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
    const [userProfile] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        avatar: '👤',
        totalExpenses: 15420,
        monthlyBudget: 25000,
        totalSavings: 45000,
        joinDate: '2024-01-15',
        level: 'Gold Member',
        pointsEarned: 2450
    });

    const [goals, setGoals] = useState([
        { 
            id: 1, 
            title: 'Emergency Fund', 
            targetAmount: 50000, 
            currentAmount: 15000, 
            deadline: '2025-12-31', 
            category: 'savings',
            priority: 'high'
        },
        { 
            id: 2, 
            title: 'Vacation Fund', 
            targetAmount: 30000, 
            currentAmount: 8500, 
            deadline: '2025-06-15', 
            category: 'travel',
            priority: 'medium'
        },
        { 
            id: 3, 
            title: 'New Laptop', 
            targetAmount: 80000, 
            currentAmount: 25000, 
            deadline: '2025-03-01', 
            category: 'tech',
            priority: 'low'
        }
    ]);

    const [showGoalForm, setShowGoalForm] = useState(false);
    const [newGoal, setNewGoal] = useState({
        title: '',
        targetAmount: '',
        currentAmount: '',
        deadline: '',
        category: 'savings',
        priority: 'medium'
    });

    const goalCategories = ['savings', 'travel', 'tech', 'education', 'health', 'entertainment', 'other'];
    const priorities = ['low', 'medium', 'high'];

    const handleGoalSubmit = (e) => {
        e.preventDefault();
        if (newGoal.title && newGoal.targetAmount && newGoal.deadline) {
            const goal = {
                id: Date.now(),
                ...newGoal,
                targetAmount: parseFloat(newGoal.targetAmount),
                currentAmount: parseFloat(newGoal.currentAmount) || 0
            };
            setGoals(prev => [...prev, goal]);
            setNewGoal({ 
                title: '', 
                targetAmount: '', 
                currentAmount: '', 
                deadline: '', 
                category: 'savings',
                priority: 'medium'
            });
            setShowGoalForm(false);
        }
    };

    const updateGoalProgress = (goalId, amount) => {
        setGoals(prev => prev.map(goal => 
            goal.id === goalId 
                ? { ...goal, currentAmount: Math.max(0, goal.currentAmount + amount) }
                : goal
        ));
    };

    const deleteGoal = (goalId) => {
        setGoals(prev => prev.filter(goal => goal.id !== goalId));
    };

    const getProgressPercentage = (current, target) => {
        return Math.min((current / target) * 100, 100);
    };

    const getCategoryIcon = (category) => {
        const icons = {
            savings: '💰',
            travel: '✈️',
            tech: '💻',
            education: '📚',
            health: '🏥',
            entertainment: '🎮',
            other: '🎯'
        };
        return icons[category] || '🎯';
    };

    const getPriorityColor = (priority) => {
        const colors = {
            high: 'border-red-500 bg-red-500/10',
            medium: 'border-yellow-500 bg-yellow-500/10',
            low: 'border-green-500 bg-green-500/10'
        };
        return colors[priority] || colors.medium;
    };

    const getPriorityIcon = (priority) => {
        const icons = {
            high: '🔥',
            medium: '⚡',
            low: '🌱'
        };
        return icons[priority] || '⚡';
    };

    const completedGoals = goals.filter(goal => getProgressPercentage(goal.currentAmount, goal.targetAmount) >= 100);
    const activeGoals = goals.filter(goal => getProgressPercentage(goal.currentAmount, goal.targetAmount) < 100);

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1 className="profile-title">
                    <span className="gradient-text">👤 Your Profile</span>
                </h1>
                <p className="profile-subtitle">Manage your account and financial goals</p>
            </div>

            <div className="profile-layout">
                
                {/* Left Sidebar - Profile Info */}
                <div className="profile-sidebar">
                    <div className="profile-card glass-card shimmer">
                        <div className="profile-avatar-section">
                            <div className="profile-avatar">
                                {userProfile.avatar}
                            </div>
                            <div className="profile-info">
                                <h2 className="profile-name gradient-text">{userProfile.name}</h2>
                                <p className="profile-email">{userProfile.email}</p>
                                <div className="profile-badge">
                                    <span className="badge-icon">⭐</span>
                                    <span className="badge-text">{userProfile.level}</span>
                                </div>
                                <p className="profile-member-since">
                                    Member since {new Date(userProfile.joinDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="profile-stats">
                            <h3 className="stats-title">📊 Financial Overview</h3>
                            <div className="stat-item">
                                <span className="stat-label">Total Expenses</span>
                                <span className="stat-value expense">₹{userProfile.totalExpenses.toLocaleString()}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Monthly Budget</span>
                                <span className="stat-value budget">₹{userProfile.monthlyBudget.toLocaleString()}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Total Savings</span>
                                <span className="stat-value savings">₹{userProfile.totalSavings.toLocaleString()}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Active Goals</span>
                                <span className="stat-value goals">{activeGoals.length}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Points Earned</span>
                                <span className="stat-value points">{userProfile.pointsEarned}</span>
                            </div>
                        </div>

                        <button className="edit-profile-btn premium-button">
                            ✏️ Edit Profile
                        </button>
                    </div>
                </div>

                {/* Main Content - Goals Section */}
                <div className="goals-main">
                    <div className="goals-header">
                        <h2 className="goals-title gradient-text">🎯 Financial Goals</h2>
                        <button 
                            onClick={() => setShowGoalForm(!showGoalForm)}
                            className="add-goal-btn premium-button"
                        >
                            {showGoalForm ? '❌ Cancel' : '➕ Add Goal'}
                        </button>
                    </div>

                    {/* Add Goal Form */}
                    {showGoalForm && (
                        <div className="goal-form-container glass-card shimmer">
                            <h3 className="form-title">Create New Financial Goal</h3>
                            <form onSubmit={handleGoalSubmit} className="goal-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Goal Title</label>
                                        <input
                                            type="text"
                                            value={newGoal.title}
                                            onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                                            className="form-input"
                                            placeholder="e.g., Emergency Fund"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Category</label>
                                        <select
                                            value={newGoal.category}
                                            onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value }))}
                                            className="form-select"
                                        >
                                            {goalCategories.map(cat => (
                                                <option key={cat} value={cat}>
                                                    {getCategoryIcon(cat)} {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Target Amount (₹)</label>
                                        <input
                                            type="number"
                                            value={newGoal.targetAmount}
                                            onChange={(e) => setNewGoal(prev => ({ ...prev, targetAmount: e.target.value }))}
                                            className="form-input"
                                            min="1"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Current Amount (₹)</label>
                                        <input
                                            type="number"
                                            value={newGoal.currentAmount}
                                            onChange={(e) => setNewGoal(prev => ({ ...prev, currentAmount: e.target.value }))}
                                            className="form-input"
                                            min="0"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Target Deadline</label>
                                        <input
                                            type="date"
                                            value={newGoal.deadline}
                                            onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Priority</label>
                                        <select
                                            value={newGoal.priority}
                                            onChange={(e) => setNewGoal(prev => ({ ...prev, priority: e.target.value }))}
                                            className="form-select"
                                        >
                                            {priorities.map(priority => (
                                                <option key={priority} value={priority}>
                                                    {getPriorityIcon(priority)} {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="submit-goal-btn premium-button">
                                    🚀 Create Goal
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Goals List */}
                    <div className="goals-list">
                        {activeGoals.length > 0 && (
                            <div className="goals-section">
                                <h3 className="section-title">🎯 Active Goals ({activeGoals.length})</h3>
                                <div className="goals-grid">
                                    {activeGoals.map((goal) => {
                                        const progressPercentage = getProgressPercentage(goal.currentAmount, goal.targetAmount);
                                        const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
                                        
                                        return (
                                            <div key={goal.id} className={`goal-card glass-card shimmer ${getPriorityColor(goal.priority)}`}>
                                                <div className="goal-header">
                                                    <div className="goal-info">
                                                        <div className="goal-category-icon">
                                                            {getCategoryIcon(goal.category)}
                                                        </div>
                                                        <div className="goal-text">
                                                            <h4 className="goal-title">{goal.title}</h4>
                                                            <p className="goal-meta">
                                                                {goal.category} • {getPriorityIcon(goal.priority)} {goal.priority} • 
                                                                Due: {new Date(goal.deadline).toLocaleDateString()} 
                                                                {daysLeft > 0 ? ` (${daysLeft} days left)` : ' (Overdue)'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button 
                                                        onClick={() => deleteGoal(goal.id)}
                                                        className="delete-goal-btn"
                                                        title="Delete Goal"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>

                                                <div className="goal-progress">
                                                    <div className="progress-info">
                                                        <span className="progress-label">Progress</span>
                                                        <span className="progress-value">
                                                            ₹{goal.currentAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()} ({progressPercentage.toFixed(1)}%)
                                                        </span>
                                                    </div>
                                                    <div className="progress-bar">
                                                        <div 
                                                            className="progress-fill"
                                                            style={{ width: `${progressPercentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div className="goal-actions">
                                                    <button 
                                                        onClick={() => updateGoalProgress(goal.id, 1000)}
                                                        className="action-btn add-btn"
                                                    >
                                                        ➕ ₹1K
                                                    </button>
                                                    <button 
                                                        onClick={() => updateGoalProgress(goal.id, 5000)}
                                                        className="action-btn add-btn"
                                                    >
                                                        ➕ ₹5K
                                                    </button>
                                                    <button 
                                                        onClick={() => updateGoalProgress(goal.id, -1000)}
                                                        className="action-btn remove-btn"
                                                    >
                                                        ➖ ₹1K
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {completedGoals.length > 0 && (
                            <div className="goals-section">
                                <h3 className="section-title">🏆 Completed Goals ({completedGoals.length})</h3>
                                <div className="goals-grid">
                                    {completedGoals.map((goal) => (
                                        <div key={goal.id} className="goal-card glass-card shimmer completed-goal">
                                            <div className="goal-header">
                                                <div className="goal-info">
                                                    <div className="goal-category-icon">
                                                        {getCategoryIcon(goal.category)}
                                                    </div>
                                                    <div className="goal-text">
                                                        <h4 className="goal-title">{goal.title}</h4>
                                                        <p className="goal-meta">Completed • {goal.category}</p>
                                                    </div>
                                                </div>
                                                <div className="completed-badge">
                                                    🏆
                                                </div>
                                            </div>
                                            <div className="completion-message">
                                                <span className="celebration-text">🎉 Goal Completed! Congratulations!</span>
                                                <span className="achievement-amount">₹{goal.targetAmount.toLocaleString()} achieved</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {goals.length === 0 && (
                            <div className="empty-goals glass-card shimmer">
                                <div className="empty-icon">🎯</div>
                                <h3 className="empty-title">No Goals Yet</h3>
                                <p className="empty-description">Start your financial journey by setting your first goal!</p>
                                <button 
                                    onClick={() => setShowGoalForm(true)}
                                    className="premium-button"
                                >
                                    ➕ Create Your First Goal
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
