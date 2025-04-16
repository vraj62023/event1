import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './navbar.js';
import Home from './home.js';
import Login from './login.js';
import Profile from './profile.js';
import Team from './team.js';
import Timeline from './timeline.js';
import TimelineWrapper from './TimelineWrapper'; // New
import Day1 from './Day1'; // New


function App() {
  return (
    <BrowserRouter basename="/Space-Quiz-Event">
      <div className="App">
        <Navbar/>
        <div className="home">
          <Routes>
            <Route path='/Space-Quiz-Event' element={<Home />} />
            <Route path='/' element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/team" element={<Team/>} />
            
            {/* Updated Timeline Route */}
            <Route path="/timeline" element={<TimelineWrapper />}>
              <Route index element={<Timeline />} />
              <Route path="day1" element={<Day1 />} />
              <Route path="day2" element={<Day1 />} />
              <Route path="day3" element={<Day1 />} />
              <Route path="day4" element={<Day1 />} />
            
              {/* Add more days as needed */}
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;