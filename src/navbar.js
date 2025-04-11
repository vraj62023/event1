import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src="https://images.stockcake.com/public/1/7/0/17085d24-d7bc-496e-b872-11f1d0436b20_large/rocket-speeding-skyward-stockcake.jpg" alt="" />
                <h1 className="extreme-3d" data-text="Rocket Riders">Rocket Riders</h1>
            </div>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/timeline">Event Timeline</Link>
                <Link to="/Login">Login</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/team">Teams</Link>

            </div>
        </nav>
    );
}
export default Navbar;