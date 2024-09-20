import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For navigation
import Header from './Header'; // Reusable header component
import Card from './Card'; // Reusable card component for articles/tutorials
import Button from './Button'; // Reusable button component
import Footer from './Footer'; // Reusable footer component
import Subscribe from './Subscribe'; // Reusable sign-up component
import './css/Home.css'; // Styles specific to the Home component

/**
 * Home component.
 * This component serves as the main landing page for the application,
 * displaying welcome text, search functionality, articles, tutorials,
 * and user authentication actions.
 */
const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login status
    const navigate = useNavigate(); // Hook for programmatic navigation

    // Check if user is logged in when component mounts
    useEffect(() => {
        const token = localStorage.getItem('authToken'); // Retrieve token from local storage
        if (token) {
            setIsLoggedIn(true); // Update state if token exists
        }
    }, []);

    // Handle user logout functionality
    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Remove token from local storage
        setIsLoggedIn(false); // Update login state
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="home-page">
            <Header /> {/* Render the header component */}
            <img 
                style={{ width: 1500 }} 
                src={require('./images/Deakin.avif')} 
                alt="Deakin Image" 
            />

            {/* Welcome and Search Section */}
            <h1>Welcome to the Home Page</h1>
            <div className="search-bar">
                <p>Dev@DEAKIN</p>
                <input type="text" placeholder="Search..." />
                {/* Conditional rendering for post button or sign-up prompt */}
                {isLoggedIn ? (
                    <Link to='/post'>
                        <button type="button">Post</button> {/* Button to navigate to post page */}
                    </Link>
                ) : (
                    <p>Sign up/Login to post</p> // Prompt for authentication
                )}
            </div>

            {/* Actions: Login/Logout Button */}
            <div className="actions">
                {isLoggedIn ? (
                    <button className="logout-button" onClick={handleLogout}>
                        Logout {/* Logout button functionality */}
                    </button>
                ) : (
                    <Link to="/login">
                        <button className="login-button">Login</button> {/* Button to navigate to login page */}
                    </Link>
                )}
            </div>

            {/* Featured Articles Section */}
            <h1>Featured Articles</h1>
            <div className="ArticleSection">
                <Card 
                    image={require('./images/React.avif')}
                    title="Article 1" 
                    description="Description for Article 1." 
                    author="Author 1" 
                    rating="3.5" 
                />
                <Card 
                    image={require('./images/React.avif')}
                    title="Article 2" 
                    description="Description for Article 2." 
                    author="Author 2" 
                    rating="4.0" 
                />
                <Card 
                    image={require('./images/React.avif')}
                    title="Article 3" 
                    description="Description for Article 3." 
                    author="Author 3" 
                    rating="4.5" 
                />
            </div>
            <Button text="See all articles" /> {/* Button to navigate to all articles */}

            {/* Featured Tutorials Section */}
            <h1 className="TutorialHeadline">Featured Tutorials</h1>
            <div className="TutorialSection">
                <Card 
                    image={require('./images/Deakin.avif')}
                    title="Tutorial 1" 
                    description="Description for Tutorial 1." 
                    author="Author 1" 
                    rating="4.7" 
                />
                <Card 
                    image={require('./images/Deakin.avif')}
                    title="Tutorial 2" 
                    description="Description for Tutorial 2." 
                    author="Author 2" 
                    rating="3.8" 
                />
                <Card 
                    image={require('./images/Deakin.avif')}
                    title="Tutorial 3" 
                    description="Description for Tutorial 3." 
                    author="Author 3" 
                    rating="4.5" 
                />
            </div>
            <Button text="See all tutorials" /> {/* Button to navigate to all tutorials */}
            <div className='subscribe'>
            {/* SignUp Section */}
            <Subscribe  /> {/* Render the sign-up component */}
            </div>

            {/* Footer */}
            <Footer /> {/* Render the footer component */}
        </div>
    );
};

export default Home;
