import React from 'react';
import SolarSystemBackground from './solarsystem.js';

const events = [
  {
    id: 1,
    date: 'April 10',
    time: '10:00 AM',
    title: 'Registration Opens',
    description: 'Online registration begins for all participants',
    icon: '📝'
  },
  {
    id: 2,
    date: 'April 15',
    time: '6:00 PM',
    title: 'Orientation Webinar',
    description: 'Learn about quiz format and rules',
    icon: '💻'
  },
  {
    id: 3,
    date: 'April 20',
    time: '11:59 PM',
    title: 'Registration Closes',
    description: 'Last chance to sign up for the quiz',
    icon: '⏰'
  },
  {
    id: 4,
    date: 'April 25',
    time: '9:00 AM',
    title: 'Preliminary Round',
    description: 'First elimination round begins',
    icon: '📋'
  },
  {
    id: 5,
    date: 'April 28',
    time: '2:00 PM',
    title: 'Semi-Finals',
    description: 'Top 20 teams compete',
    icon: '🔭'
  },
  {
    id: 6,
    date: 'May 1',
    time: '6:00 PM',
    title: 'Grand Finale',
    description: 'Championship round with top 5 teams',
    icon: '🏆'
  }
];

const Timeline = () => {
  return (
    <div className="timeline-page">
      <SolarSystemBackground/>
      <div className="timeline-header">
        <h1>Event Timeline</h1>
        <p>Journey through the Space Quiz experience</p>
      </div>
      
      <div className="timeline-container">
        {events.map((event, index) => (
          <div 
            key={event.id} 
            className={`timeline-event ${index % 2 === 0 ? 'left' : 'right'}`}
          >
            <div className="event-content">
              <div className="event-icon">{event.icon}</div>
              <div className="event-date">{event.date} • {event.time}</div>
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.description}</p>
            </div>
            <div className="timeline-marker"></div>
          </div>
        ))}
        <div className="timeline-line"></div>
      </div>
      
      <div className="timeline-footer">
        <p>All times are in IST (UTC+5:30)</p>
        <button className="calendar-button">Add to Calendar</button>
      </div>
    </div>
  );
};

export default Timeline;