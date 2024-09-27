import React, { useState } from 'react';
import Button from './Button'; // Importing reusable Button component

/**
 * Subscribe component.
 * This component allows users to sign up for daily updates by entering their email,
 * and handles form submission to subscribe the user.
 */
const Subscribe = () => {
  // State to manage the input email value
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform simple email validation
    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email address.');
      return;
    }

    // Call backend API to subscribe the email
    // Updated fetch URL to point to your Node.js backend
fetch('http://localhost:5000/subscribe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email }),
})

      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMessage('Subscription successful! Welcome email has been sent.');
        } else {
          setMessage('Subscription failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('An error occurred. Please try again later.');
      });
  };

  return (
    <div className="header">
      <h2>Sign up for daily insider</h2> {/* Header text */}
      {/* Input field for email */}
      <input
        className="searchbar"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {/* Submit button */}
      <Button type="button" text="Submit" className="submit" onClick={handleSubmit} />
      
      {/* Feedback message */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Subscribe;
