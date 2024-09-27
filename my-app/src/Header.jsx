// Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css'; // Ensure you have the appropriate styles

const Header = () => {
    return (
        <header className="header">
            <nav className="navbar">
                <Link to="/" className="nav-link">Home</Link>
                
                {/* New button for Find Question */}
                <Link to="/about" className="nav-link">About</Link>
                {/* Add other links as needed */}
            </nav>
        </header>
    );
};

export default Header;
