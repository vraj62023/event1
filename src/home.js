import React, { useState, useEffect } from 'react';
import rocket from './assets/rocket.png';
import StarBackground from './starbackground';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import  AlienFlyer from './alien.js'

const Home = () => {
  const navigate = useNavigate();
  const aboutRef = useRef(null);
  const [isHighlighted, setIsHighlighted] = useState(false);

  const handleReadMore = () => {
    aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    setIsHighlighted(true);

    // Remove highlight after 3 seconds
    setTimeout(() => setIsHighlighted(false), 3000);
  };

  const calculateTimeLeft = () => {
    const targetDate = new Date('2025-05-01T00:00:00'); // 🔧 change to your desired date
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup
  }, []);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="home">
      <StarBackground />
      <div className="container">
        <div className="content">
          <h1>SPACE QUIZ <span>LAUNCHING</span> IN:</h1>
          <div className="countdown">
            <div>
              <p>{String(timeLeft.days).padStart(2, '0')}</p>
              <span>Days</span>
            </div>
            <div>
              <p>{String(timeLeft.hours).padStart(2, '0')}</p>
              <span>Hours</span>
            </div>
            <div>
              <p>{String(timeLeft.minutes).padStart(2, '0')}</p>
              <span>Minutes</span>
            </div>
            <div>
              <p>{String(timeLeft.seconds).padStart(2, '0')}</p>
              <span>Seconds</span>
            </div>
          </div>
          <button type="button" className='learnMore' onClick={handleReadMore} >Learn More ...</button>
          <button onClick={() => navigate('/login')} className="register-btn">Register Now</button>

        </div>
        <img src={rocket} alt="" className='rocket-image' />
        <img src="https://png.pngtree.com/png-vector/20220706/ourmid/pngtree-ufo-alien-png-image_5721652.png" alt="" className='alien'  id="alien"/>
        <AlienFlyer />
      </div>
      <hr />
   
      <div ref={aboutRef} className={`event-details ${isHighlighted ? 'highlight' : ''}`}>
        <h2>About the Event</h2>
        <p>
          Join us for an intergalactic journey through trivia! The Space Quiz is a thrilling competition testing your knowledge of astronomy, astrophysics, space missions, and sci-fi culture.
          {isExpanded && (
            <span className="expanded-content">
              <br /><br />
              This year's edition features special rounds on exoplanet discoveries and recent Mars missions.
              Participants will face challenges ranging from identifying celestial objects to solving physics
              problems related to space travel. The quiz will be conducted in three stages: preliminary,
              semi-final, and final, with exciting prizes for the winning team.
            </span>
          )}
        </p>
        <button
          className="read-more-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </div>
      <div className="event-info">
        <h2>Event Schedule</h2>
        <ul>
          <li><strong>Date:</strong> April 15, 2025</li>
          <li><strong>Time:</strong> 6:00 PM IST</li>
          <li><strong>Venue:</strong> Main Auditorium, IIT Kharagpur</li>
        </ul>
        <button onClick={() => navigate('/timeline')} className="timeline-btn">details...</button>
      </div>
      <br />
     
      <div className="rules-section">
        <h2>Rules & Guidelines</h2>
        <ul>
          <li>Max 2 participants per team.</li>
          <li>No use of mobile phones or the internet during the quiz.</li>
          <li>Questions will be from space science, pop culture, and astronomy.</li>
        </ul>
      </div>
      <div className="contact-section">
        <h2>Need Help?</h2>
        <p>Contact: Rahul Verma - 9876543210</p>
        <p>Email: spaceclub@kgp.ac.in</p>
      </div>

    </div>
  );
};

export default Home;
