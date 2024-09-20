// TitleBox.jsx
import React from 'react';
import '../css/TitleBox.css';

const TitleBox = ({ placeholder }) => {
  return (
    <div className="TitleBox">
      <label htmlFor="titleInput" style={{ marginRight: 10 }}>Title</label>
      <input 
        id="titleInput"
        style={{ height: 20, width: 600 }} 
        placeholder={placeholder} 
        aria-label="Title input" // For accessibility
      />
    </div>
  );
};

export default TitleBox;
