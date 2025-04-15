import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarBackground from './starbackground';

const Login = () => {
    const navigate = useNavigate();
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'teamMembers' ? Number(value) : value
        }));
    };

    const handleMemberChange = (e, index) => {
        const { value } = e.target;
        setFormData(prev => ({
            ...prev,
            [`member${index}`]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Store user data in localStorage
        localStorage.setItem('spaceQuizUser', JSON.stringify(formData));
        
        // Navigate to profile with the data
        navigate('/profile', { state: { userData: formData } });
    };

    return (
        <div className="login-container">
            <StarBackground/>
            <h2>{isRegistering ? 'Register for Space Quiz' : 'Space Quiz Login'}</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                    />
                </div>

                {isRegistering && (
                    <>
                        <div className="form-group">
                            <label>Team Name:</label>
                            <input
                                type="text"
                                name="teamName"
                                value={formData.teamName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Captain's Name:</label>
                            <input
                                type="text"
                                name="captainName"
                                value={formData.captainName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone Number:</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Institute/Organization:</label>
                            <input
                                type="text"
                                name="institute"
                                value={formData.institute}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Team Members:</label>
                            <select
                                name="teamMembers"
                                value={formData.teamMembers}
                                onChange={handleChange}
                            >
                                {[1, 2, 3, 4].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>

                        {[...Array(formData.teamMembers - 1)].map((_, index) => (
                            <div className="form-group" key={`member-${index}`}>
                                <label>Team Member {index + 1} Name:</label>
                                <input
                                    type="text"
                                    name={`member${index + 1}`}
                                    value={formData[`member${index + 1}`] || ''}
                                    onChange={(e) => handleMemberChange(e, index + 1)}
                                    required
                                />
                            </div>
                        ))}

                        <div className="form-group">
                            <label>Astronomy Experience Level:</label>
                            <select
                                name="experienceLevel"
                                value={formData.experienceLevel}
                                onChange={handleChange}
                            >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Avatar URL (optional):</label>
                            <input
                                type="url"
                                name="avatar"
                                value={formData.avatar}
                                onChange={handleChange}
                                placeholder="Paste image link"
                            />
                        </div>
                    </>
                )}

                <button type="submit" className="submit-btn">
                    {isRegistering ? 'Register' : 'Login'}
                </button>
            </form>

            <button
                className="toggle-btn"
                onClick={() => setIsRegistering(!isRegistering)}
            >
                {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
            </button>
        </div>
    );
};

export default Login;