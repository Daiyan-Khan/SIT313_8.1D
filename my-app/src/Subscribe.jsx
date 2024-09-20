// SignUp.js
import React from 'react';
import Button from './Button'; // Importing reusable Button component

/**
 * SignUp component.
 * This component displays a header for signing up for daily updates,
 * along with an input field for user input and a submit button.
 */
const Subscribe = () => {
  return (
    <div className='header'>
      <h2>Sign up for daily insider</h2> {/* Header text for the sign-up section */}
      <input className='searchbar' type="text" placeholder="Search" /> {/* Input field for user entry */}
      <Button type="button" text="Submit" className="submit" /> {/* Submit button for the form */}
    </div>
  );
};

export default Subscribe;
