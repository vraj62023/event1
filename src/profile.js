import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import WormholeBackground from './backgroundprofile.js';

const Profile = () => {
    const location = useLocation();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        teamName: '',
        teamMembers: 1,
        captainName: '',
        phone: '',
        institute: '',
        experienceLevel: 'beginner',
        avatar: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Check for data passed through navigation state
        if (location.state?.userData) {
            setUserData(location.state.userData);
        } else {
            // Fallback to localStorage
            const storedData = JSON.parse(localStorage.getItem('spaceQuizUser'));
            if (storedData) {
                setUserData(storedData);
            }
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: name === 'teamMembers' ? Number(value) : value
        }));
    };

    const handleMemberChange = (e, index) => {
        const { value } = e.target;
        setUserData(prev => ({
            ...prev,
            [`member${index}`]: value
        }));
    };

    const handleSave = () => {
        localStorage.setItem('spaceQuizUser', JSON.stringify(userData));
        setIsEditing(false);
    };

    const getExperienceText = (level) => {
        switch(level) {
            case 'beginner': return '🌱 Beginner';
            case 'intermediate': return '🚀 Intermediate';
            case 'advanced': return '🪐 Advanced';
            default: return level;
        }
    };

    return (
        <div className="profile-container">
            <WormholeBackground/>
            <div className="profile-header">
                {userData.avatar ? (
                    <img src={userData.avatar} alt="Profile" className="profile-avatar" />
                ) : (
                    <div className="default-avatar">👨‍🚀</div>
                )}
                <h2>Welcome, {userData.captainName || 'Space Explorer'}!</h2>
                <p className="team-name">{userData.teamName || 'Unnamed Team'}</p>

                <div className="profile-actions">
                    <button 
                        onClick={() => setIsEditing(!isEditing)} 
                        className="edit-btn"
                    >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                    {isEditing && (
                        <button onClick={handleSave} className="save-btn">
                            Save Changes
                        </button>
                    )}
                </div>
            </div>

            <div className="profile-details">
                <div className="detail-card">
                    <h3>Team Information</h3>
                    {isEditing ? (
                        <>
                            <div className="form-group">
                                <label>Team Name:</label>
                                <input
                                    type="text"
                                    name="teamName"
                                    value={userData.teamName || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Captain's Name:</label>
                                <input
                                    type="text"
                                    name="captainName"
                                    value={userData.captainName || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Team Members:</label>
                                <select
                                    name="teamMembers"
                                    value={userData.teamMembers}
                                    onChange={handleChange}
                                >
                                    {[1, 2, 3, 4].map(num => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>
                            </div>
                        </>
                    ) : (
                        <>
                            <p><strong>Team Name:</strong> {userData.teamName || 'Not specified'}</p>
                            <p><strong>Captain:</strong> {userData.captainName || 'Not specified'}</p>
                            <p><strong>Team Size:</strong> {userData.teamMembers}</p>
                        </>
                    )}
                </div>

                <div className="detail-card">
                    <h3>Team Members</h3>
                    {isEditing ? (
                        <>
                            {[...Array(userData.teamMembers - 1)].map((_, index) => (
                                <div className="form-group" key={`member-edit-${index}`}>
                                    <label>Member {index + 1}:</label>
                                    <input
                                        type="text"
                                        name={`member${index + 1}`}
                                        value={userData[`member${index + 1}`] || ''}
                                        onChange={(e) => handleMemberChange(e, index + 1)}
                                    />
                                </div>
                            ))}
                        </>
                    ) : (
                        <ul className="member-list">
                            <li><strong>Captain:</strong> {userData.captainName || 'Not specified'}</li>
                            {[...Array(userData.teamMembers - 1)].map((_, index) => (
                                <li key={`member-view-${index}`}>
                                    <strong>Member {index + 1}:</strong> {userData[`member${index + 1}`] || 'Not specified'}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="detail-card">
                    <h3>Contact Information</h3>
                    {isEditing ? (
                        <>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone:</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={userData.phone || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Institute:</label>
                                <input
                                    type="text"
                                    name="institute"
                                    value={userData.institute || ''}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <p><strong>Email:</strong> {userData.email || 'Not specified'}</p>
                            <p><strong>Phone:</strong> {userData.phone || 'Not specified'}</p>
                            <p><strong>Institute:</strong> {userData.institute || 'Not specified'}</p>
                        </>
                    )}
                </div>

                <div className="detail-card">
                    <h3>Experience Level</h3>
                    {isEditing ? (
                        <select
                            name="experienceLevel"
                            value={userData.experienceLevel}
                            onChange={handleChange}
                            className="experience-select"
                        >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    ) : (
                        <p>{getExperienceText(userData.experienceLevel)}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;