import { Link } from 'react-router-dom';
import './Timeline.css';
import StarBackground from './starbackground';

const Timeline = () => {
  const eventDays = [
    { day: 1, date: 'April 10-15', title: 'Registration Phase' },
    { day: 2, date: 'April 20-25', title: 'Preliminary Rounds' },
    { day: 3, date: 'April 28', title: 'Semi-Finals' },
    { day: 4, date: 'May 1', title: 'Grand Finale' }
  ];

  return (
    <>
       
      <div className="timeline-header">
   
        <h1>Event Timeline</h1>
        <p>Select a day to view detailed schedule</p>
      </div>
      
      <div className="days-grid">
      <StarBackground />
        {eventDays.map(({ day, date, title }) => (
          <Link to={`day${day}`} key={day} className="day-card">
            <div className="day-number">Day {day}</div>
            <div className="day-date">{date}</div>
            <h3 className="day-title">{title}</h3>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Timeline;