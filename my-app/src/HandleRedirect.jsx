// src/components/HandleRedirect.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSignInWithEmailLink } from '../utils/firebase';

/**
 * HandleRedirect component.
 * This component processes the sign-in email link and redirects the user upon successful authentication.
 */
const HandleRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the current URL for sign-in link verification
    const url = window.location.href;

    // Function to handle the sign-in process
    const signIn = async () => {
      // Attempt to sign in the user with the email link
      const user = await handleSignInWithEmailLink(url);
      if (user) {
        // Redirect to the home page or dashboard upon successful sign-in
        navigate('/');
      }
    };

    // Call the signIn function
    signIn();
  }, [navigate]);

  // Loading state while the sign-in process is happening
  return <div>Loading...</div>;
};

export default HandleRedirect;
