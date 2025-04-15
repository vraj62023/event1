const Day1 = () => {
    const events = [
      {
        time: '10:00 AM',
        title: 'Registration Opens',
        description: 'Online registration begins'
      },
      {
        time: '12:00 AM',
        title: 'Inaugration',
        description: 'Start of the event'
      },
      // Add more events for Day 1
    ];
  
    return (
      <div className="day-details">
        <h2>Day 1: Registration Phase</h2>
        <div className="events-list">
          {events.map((event, index) => (
            <div key={index} className="event-item">
              <div className="event-time">{event.time}</div>
              <div className="event-info">
                <h3>{event.title}</h3>
                <br />
                <p>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Day1;