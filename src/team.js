import React from 'react';
import StarBackground from './starbackground';

const teamMembers = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    role: 'Astrophysics Professor',
    bio: 'Expert in exoplanet research with 15 years of teaching experience',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 2,
    name: 'Mark Williams',
    role: 'Space Mission Engineer',
    bio: 'Worked on 3 Mars rover missions at NASA JPL',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 3,
    name: 'Priya Patel',
    role: 'Science Communicator',
    bio: 'Host of the popular "Cosmic Wonders" podcast',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg'
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Quiz Master',
    bio: 'National science quiz champion for 3 consecutive years',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
  }
];

const Team = () => {
  return (
    <div className="team-page">
       <StarBackground />
      <div className="team-header">
        <h1>Meet Our Cosmic Crew</h1>
        <p>The brilliant minds behind the Space Quiz experience</p>
      </div>
      
      <div className="team-grid">
        {teamMembers.map(member => (
          <div key={member.id} className="team-card">
            <div className="avatar-container">
              <img src={member.avatar} alt={member.name} className="member-avatar" />
              <div className="orbit"></div>
            </div>
            <h3>{member.name}</h3>
            <p className="role">{member.role}</p>
            <p className="bio">{member.bio}</p>
          </div>
        ))}
      </div>
      
      <div className="join-team">
        <h2>Want to join our team?</h2>
        <p>We're always looking for passionate space enthusiasts!</p>
        <button className="cta-button">Contact Us</button>
      </div>
    </div>
  );
};

export default Team;