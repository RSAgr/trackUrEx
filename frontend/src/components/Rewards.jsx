import React, { useState } from 'react';
import './Rewards.css';

const Rewards = () => {
    console.log('🎁 Rewards component is rendering');
    
    const [userStats, setUserStats] = useState({
        totalPoints: 2450,
        level: 8,
        streakDays: 15,
        totalExpenses: 156,
        goalsCompleted: 3,
        badgesEarned: 12
    });

    const [achievements] = useState([
        { id: 1, title: 'First Step', description: 'Added your first expense', icon: '🌱', earned: true, points: 50, date: '2024-08-15' },
        { id: 2, title: 'Streak Master', description: 'Logged expenses for 7 days straight', icon: '🔥', earned: true, points: 100, date: '2024-08-22' },
        { id: 3, title: 'Goal Getter', description: 'Completed your first financial goal', icon: '🎯', earned: true, points: 200, date: '2024-09-01' },
        { id: 4, title: 'Budget Boss', description: 'Stayed under budget for a month', icon: '👑', earned: true, points: 150, date: '2024-09-05' },
        { id: 5, title: 'Savings Superstar', description: 'Saved ₹50,000', icon: '⭐', earned: false, points: 300, progress: 68 },
        { id: 6, title: 'Expense Expert', description: 'Logged 200 expenses', icon: '📊', earned: false, points: 250, progress: 78 },
        { id: 7, title: 'Goal Machine', description: 'Complete 5 financial goals', icon: '🏆', earned: false, points: 500, progress: 60 },
        { id: 8, title: 'Month Master', description: 'Track expenses for 30 consecutive days', icon: '📅', earned: false, points: 200, progress: 50 }
    ]);

    const [rewards, setRewards] = useState([
        { id: 1, title: '₹100 Cashback', description: 'Redeem for instant cashback', cost: 1000, category: 'cashback', available: true },
        { id: 2, title: 'Premium Theme', description: 'Unlock exclusive app themes', cost: 500, category: 'customization', available: true },
        { id: 3, title: 'Budget Boost', description: 'Get extra budget tracking features', cost: 750, category: 'features', available: true },
        { id: 4, title: '₹500 Voucher', description: 'Shopping voucher for online stores', cost: 2000, category: 'voucher', available: true },
        { id: 5, title: 'Financial Consultation', description: '1-hour session with financial advisor', cost: 3000, category: 'consultation', available: false },
        { id: 6, title: 'Premium Analytics', description: 'Advanced spending analytics', cost: 1500, category: 'features', available: true }
    ]);

    // Plant growth system
    const getPlantStage = (points) => {
        if (points < 500) return { stage: 'seed', name: 'Seed', icon: '🌰', color: '#8B4513' };
        if (points < 1000) return { stage: 'sprout', name: 'Sprout', icon: '🌱', color: '#90EE90' };
        if (points < 2000) return { stage: 'sapling', name: 'Sapling', icon: '🌿', color: '#32CD32' };
        if (points < 3500) return { stage: 'young_tree', name: 'Young Tree', icon: '🌳', color: '#228B22' };
        if (points < 5000) return { stage: 'mature_tree', name: 'Mature Tree', icon: '🌲', color: '#006400' };
        return { stage: 'mighty_oak', name: 'Mighty Oak', icon: '🌳', color: '#2F4F2F' };
    };

    const getNextStagePoints = (currentPoints) => {
        const stages = [500, 1000, 2000, 3500, 5000];
        return stages.find(stage => stage > currentPoints) || 5000;
    };

    const currentPlant = getPlantStage(userStats.totalPoints);
    const nextStagePoints = getNextStagePoints(userStats.totalPoints);
    const progressToNext = ((userStats.totalPoints % nextStagePoints) / nextStagePoints) * 100;

    const redeemReward = (rewardId, cost) => {
        if (userStats.totalPoints >= cost) {
            setUserStats(prev => ({ ...prev, totalPoints: prev.totalPoints - cost }));
            setRewards(prev => prev.map(reward => 
                reward.id === rewardId 
                    ? { ...reward, available: false }
                    : reward
            ));
        }
    };

    const earnedAchievements = achievements.filter(a => a.earned);
    const availableAchievements = achievements.filter(a => !a.earned);

    const getCategoryIcon = (category) => {
        const icons = {
            cashback: '💰',
            customization: '🎨',
            features: '⚡',
            voucher: '🎫',
            consultation: '🧠'
        };
        return icons[category] || '🎁';
    };

    const getRewardColor = (category) => {
        const colors = {
            cashback: 'border-green-500 bg-green-500/10',
            customization: 'border-purple-500 bg-purple-500/10',
            features: 'border-blue-500 bg-blue-500/10',
            voucher: 'border-yellow-500 bg-yellow-500/10',
            consultation: 'border-red-500 bg-red-500/10'
        };
        return colors[category] || 'border-gray-500 bg-gray-500/10';
    };

    return (
        <div className="rewards-container">
            <div className="rewards-header">
                <h1 className="rewards-title">
                    <span className="gradient-text">🎁 Rewards & Achievements</span>
                </h1>
                <p className="rewards-subtitle">Grow your financial tree and earn amazing rewards!</p>
            </div>

            <div className="rewards-layout">
                
                {/* Left Sidebar - Plant Growth & Stats */}
                <div className="rewards-sidebar">
                    
                    {/* Plant Growth Section */}
                    <div className="plant-section glass-card shimmer">
                        <h3 className="plant-title">🌳 Your Financial Tree</h3>
                        
                        <div className="plant-display">
                            <div className="plant-container">
                                <div 
                                    className="plant-icon"
                                    style={{ color: currentPlant.color }}
                                >
                                    {currentPlant.icon}
                                </div>
                                <div className="plant-glow"></div>
                            </div>
                            
                            <div className="plant-info">
                                <h4 className="plant-name gradient-text">{currentPlant.name}</h4>
                                <p className="plant-stage">Stage {userStats.level}</p>
                            </div>
                        </div>

                        <div className="growth-progress">
                            <div className="progress-info">
                                <span className="progress-label">Growth Progress</span>
                                <span className="progress-value">
                                    {userStats.totalPoints} / {nextStagePoints} points
                                </span>
                            </div>
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill growth-fill"
                                    style={{ width: `${progressToNext}%` }}
                                ></div>
                            </div>
                            <p className="growth-tip">
                                {nextStagePoints - userStats.totalPoints} points to next stage!
                            </p>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="stats-section glass-card shimmer">
                        <h3 className="stats-title">📊 Your Stats</h3>
                        <div className="stat-grid">
                            <div className="stat-item">
                                <div className="stat-icon">🏆</div>
                                <div className="stat-content">
                                    <span className="stat-value">{userStats.totalPoints}</span>
                                    <span className="stat-label">Total Points</span>
                                </div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-icon">⬆️</div>
                                <div className="stat-content">
                                    <span className="stat-value">Level {userStats.level}</span>
                                    <span className="stat-label">Current Level</span>
                                </div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-icon">🔥</div>
                                <div className="stat-content">
                                    <span className="stat-value">{userStats.streakDays} days</span>
                                    <span className="stat-label">Current Streak</span>
                                </div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-icon">🎯</div>
                                <div className="stat-content">
                                    <span className="stat-value">{userStats.goalsCompleted}</span>
                                    <span className="stat-label">Goals Completed</span>
                                </div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-icon">🏅</div>
                                <div className="stat-content">
                                    <span className="stat-value">{userStats.badgesEarned}</span>
                                    <span className="stat-label">Badges Earned</span>
                                </div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-icon">📝</div>
                                <div className="stat-content">
                                    <span className="stat-value">{userStats.totalExpenses}</span>
                                    <span className="stat-label">Expenses Logged</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content - Achievements & Rewards */}
                <div className="rewards-main">
                    
                    {/* Achievements Section */}
                    <div className="achievements-section">
                        <h2 className="section-title gradient-text">🏆 Achievements</h2>
                        
                        {/* Earned Achievements */}
                        {earnedAchievements.length > 0 && (
                            <div className="achievements-group">
                                <h3 className="group-title">✅ Earned ({earnedAchievements.length})</h3>
                                <div className="achievements-grid">
                                    {earnedAchievements.map((achievement) => (
                                        <div key={achievement.id} className="achievement-card glass-card shimmer earned">
                                            <div className="achievement-header">
                                                <div className="achievement-icon earned-icon">
                                                    {achievement.icon}
                                                </div>
                                                <div className="achievement-badge">✓</div>
                                            </div>
                                            <div className="achievement-content">
                                                <h4 className="achievement-title">{achievement.title}</h4>
                                                <p className="achievement-description">{achievement.description}</p>
                                                <div className="achievement-footer">
                                                    <span className="achievement-points">+{achievement.points} points</span>
                                                    <span className="achievement-date">
                                                        {new Date(achievement.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Available Achievements */}
                        {availableAchievements.length > 0 && (
                            <div className="achievements-group">
                                <h3 className="group-title">🎯 In Progress ({availableAchievements.length})</h3>
                                <div className="achievements-grid">
                                    {availableAchievements.map((achievement) => (
                                        <div key={achievement.id} className="achievement-card glass-card shimmer pending">
                                            <div className="achievement-header">
                                                <div className="achievement-icon pending-icon">
                                                    {achievement.icon}
                                                </div>
                                                <div className="achievement-progress-badge">
                                                    {achievement.progress}%
                                                </div>
                                            </div>
                                            <div className="achievement-content">
                                                <h4 className="achievement-title">{achievement.title}</h4>
                                                <p className="achievement-description">{achievement.description}</p>
                                                <div className="achievement-progress-bar">
                                                    <div 
                                                        className="achievement-progress-fill"
                                                        style={{ width: `${achievement.progress}%` }}
                                                    ></div>
                                                </div>
                                                <div className="achievement-footer">
                                                    <span className="achievement-points">+{achievement.points} points</span>
                                                    <span className="achievement-progress-text">
                                                        {achievement.progress}% complete
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Rewards Store */}
                    <div className="rewards-store">
                        <h2 className="section-title gradient-text">🛍️ Rewards Store</h2>
                        <p className="store-description">
                            Spend your hard-earned points on amazing rewards!
                        </p>

                        <div className="rewards-grid">
                            {rewards.map((reward) => (
                                <div 
                                    key={reward.id} 
                                    className={`reward-card glass-card shimmer ${getRewardColor(reward.category)} ${
                                        !reward.available ? 'redeemed' : userStats.totalPoints < reward.cost ? 'locked' : ''
                                    }`}
                                >
                                    <div className="reward-header">
                                        <div className="reward-icon">
                                            {getCategoryIcon(reward.category)}
                                        </div>
                                        <div className="reward-cost">
                                            {reward.cost} pts
                                        </div>
                                    </div>
                                    
                                    <div className="reward-content">
                                        <h4 className="reward-title">{reward.title}</h4>
                                        <p className="reward-description">{reward.description}</p>
                                    </div>

                                    <div className="reward-footer">
                                        {!reward.available ? (
                                            <button className="reward-button redeemed-button" disabled>
                                                ✅ Redeemed
                                            </button>
                                        ) : userStats.totalPoints >= reward.cost ? (
                                            <button 
                                                className="reward-button available-button"
                                                onClick={() => redeemReward(reward.id, reward.cost)}
                                            >
                                                🛒 Redeem
                                            </button>
                                        ) : (
                                            <button className="reward-button locked-button" disabled>
                                                🔒 Need {reward.cost - userStats.totalPoints} more points
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rewards;
