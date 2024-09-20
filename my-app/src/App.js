import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';  // Home page component
import Login from './routes/Login'; // Login page component
import Signup from './routes/SignUp'; // Signup page component
import PostPage from './routes/PostPage'; // Post page component
import './css/App.css'
const App = () => {
    return (
        // Router setup for managing client-side routing in the app
        <Router>
            <Routes>
                {/* Route to home page */}
                <Route path="/" element={<Home />} />

                {/* Route to login page */}
                <Route path="/login" element={<Login />} />

                {/* Route to signup page */}
                <Route path="/signup" element={<Signup />} />

                {/* Route to post page (Only accessible when logged in, logic should be handled in Home or PostPage) */}
                <Route path="/post" element={<PostPage />} />
            </Routes>
        </Router>
    );
};

export default App;
