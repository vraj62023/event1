import { Outlet } from 'react-router-dom';
import StarBackground from './starbackground'

const TimelineWrapper = () => {
  return (
    <div className="timeline-page min-h-screen">
      <StarBackground/>
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default TimelineWrapper;
