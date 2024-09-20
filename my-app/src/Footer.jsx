import React from 'react';
import './css/Footer.css'; // Import CSS file for styling

/**
 * Footer component for the application.
 * Displays navigation links, social media icons, and legal information.
 */
const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                {/* Section for navigation links */}
                <div className="footer-section">
                    <h4>Explore</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/">Questions</a></li>
                        <li><a href="/">Articles</a></li>
                        <li><a href="/">Tutorials</a></li>
                    </ul>
                </div>

                {/* Section for support links */}
                <div className="footer-section">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="/">FAQs</a></li>
                        <li><a href="/">Help</a></li>
                        <li><a href="/">Contact Us</a></li>
                    </ul>
                </div>

                {/* Section for social media links */}
                <div className="footer-section">
                    <h4>Stay connected</h4>
                    <ul className="social-icons">
                        <li>
                            <a href="/">
                                <i className="fab fa-facebook-f">
                                    <img className='icon' src={require('./images/fb.png')} alt="Facebook" />
                                </i>
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <i className="fab fa-twitter">
                                    <img className='icon' src={require('./images/twitter.jpg')} alt="Twitter" />
                                </i>
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <i className="fab fa-instagram">
                                    <img className='icon' src={require('./images/ig.png')} alt="Instagram" />
                                </i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom section for legal information */}
            <div className="footer-bottom">
                <p>&copy; DEV@Deakin 2022</p>
                <ul>
                    <li><a href="/">Privacy Policy</a></li>
                    <li><a href="/">Terms</a></li>
                    <li><a href="/">Code of Conduct</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
