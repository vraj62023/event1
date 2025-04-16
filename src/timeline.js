import { Link } from "react-router-dom";
import "./Timeline.css";
import StarBackground from "./starbackground";

const Timeline = () => {
  const eventDays = [
    { 
      day: 1, 
      date: "April 10-15", 
      title: "Registration Phase",
      description: "Register your team and submit initial project proposals. Get ready for an exciting competition ahead!"
    },
    { 
      day: 2, 
      date: "April 20-25", 
      title: "Preliminary Rounds",
      description: "Teams compete in the initial rounds. Showcase your skills and innovation to advance to the next stage."
    },
    { 
      day: 3, 
      date: "April 28", 
      title: "Semi-Finals",
      description: "Top teams battle it out in intense semi-final matches. Only the best will make it to the grand finale."
    },
    { 
      day: 4, 
      date: "May 1", 
      title: "Grand Finale",
      description: "The ultimate showdown! Witness the most innovative projects and celebrate the winners."
    },
  ];

  return (
    <div className="timeline-container">
      <StarBackground />
      <h1 className="timeline-title">🚀 Event Timeline</h1>
      <div className="timeline-orbs">
        {eventDays.map(({ day, date, title, description }) => (
          <Link to={`day${day}`} key={day} className="orb-link">
            <div className="orb-wrapper">
              <div className="orb">
                <div className="orb-inner-glow" />
                <div className="orb-text">
                  <div className="orb-day">Day {day}</div>
                  <div className="orb-date">{date}</div>
                  <div className="orb-title">{title}</div>
                </div>
              </div>
              <div className="event-description">
                {description}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Timeline;