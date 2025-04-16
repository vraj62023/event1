import { Outlet } from 'react-router-dom';
import StarBackground from './starbackground';

const TimelineWrapper = () => {
  return (
    <div className="timeline-page">
        <StarBackground />
      <Outlet />
    </div>
  );
};

export default TimelineWrapper;