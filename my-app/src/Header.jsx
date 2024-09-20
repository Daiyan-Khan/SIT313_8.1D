// Header.js
import React from 'react';
import "./css/Header.css"; // Importing styles for the Header component

/**
 * Header component.
 * This component renders the header section of the application,
 * including the title, search bar, and action buttons.
 */
const Header = () => {
  return (
    <div className='header'>
      <h1 style={{ marginRight: 20 }}>DEV@Deakin</h1> {/* Main title of the application */}
      
      {/* Search bar for users to search content */}
      <input className='searchbar' type="text" placeholder="Search" />
      
      {/* Button for posting content */}
      <button className='submit'>Post</button>
      
      {/* Button for logging in */}
      <button className='submit'>Login</button>
    </div>
  );
};

export default Header;
