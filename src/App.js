import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar.js';
import Home from './home.js';
import Login from './login.js';
import Profile from './profile.js';
import Team from './team.js';
import Timeline from './timeline.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="home">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/team" element={<Team/>} />
            <Route path="/timeline" element={<Timeline/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
