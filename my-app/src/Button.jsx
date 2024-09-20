import React from 'react';
import './css/Button.css'; // Optional: Import for button-specific styles

/**
 * Reusable Button component.
 *
 * @param {string} type - Specifies the button type (e.g., "submit", "button", "reset").
 * @param {string} text - The label/text displayed on the button.
 * @param {function} onClick - The function to handle button click events.
 * @param {string} className - Optional: Additional CSS class for styling the button.
 */
const Button = ({ type = "button", text, onClick, className }) => {
    return (
        // Render the button element with dynamic properties
        <button type={type} onClick={onClick} className={className}>
            {text}
        </button>
    );
};

export default Button;
