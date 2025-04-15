import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img
                    src="https://images.stockcake.com/public/1/7/0/17085d24-d7bc-496e-b872-11f1d0436b20_large/rocket-speeding-skyward-stockcake.jpg"
                    alt="Rocket Logo"
                />
                <h1 className="extreme-3d" data-text="Rocket Riders">Rocket Riders</h1>
            </div>

            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                <span className={menuOpen ? 'bar rotate1' : 'bar'}></span>
                <span className={menuOpen ? 'bar fade' : 'bar'}></span>
                <span className={menuOpen ? 'bar rotate2' : 'bar'}></span>
            </div>

            <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/timeline" onClick={() => setMenuOpen(false)}>Event Timeline</Link>
                <Link to="/Login" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
                <Link to="/team" onClick={() => setMenuOpen(false)}>Teams</Link>
            </div>
        </nav>
    );
};

export default Navbar;
