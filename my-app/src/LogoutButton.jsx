import React from 'react';

/**
 * LogoutButton component.
 * This component renders a button that triggers the logout action when clicked.
 *
 * Props:
 * - onLogout: Function to be called when the button is clicked to handle logout.
 */
const LogoutButton = ({ onLogout }) => {
  return (
    <button onClick={onLogout}> {/* Button that triggers the logout function */}
      Logout
    </button>
  );
};

export default LogoutButton;
