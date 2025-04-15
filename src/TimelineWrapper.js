import { Outlet } from 'react-router-dom';
import StarBackground from './starbackground';

const TimelineWrapper = () => {
  return (
    <div className="timeline-page">
        <StarBackground />
      <Outlet /> {/* This will render the child routes */}
    </div>
  );
};

export default TimelineWrapper;