import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { signInWithEmail } from '../utils/firebase'; // Firebase authentication utility
import Input from '../Input';
import Button from '../Button';
import '../css/Login.css'; // Import the CSS file

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await signInWithEmail(formData.email, formData.password); // Assuming this function returns a token
            localStorage.setItem('authToken', token); // Store the token in localStorage
            navigate('/'); // Redirect to the home page after successful login
        } catch (error) {
            setError(error.message); // Display the error message to the user
        }
    };

    return (
        <div className='login'>
            <div className='signup-link'>
                <Button className ='signup-button' onClick={() => navigate('/signup')} text="Sign Up" />
            </div>
            <br></br>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <Input name="email" type="email" placeholder="Email" onChange={handleChange} value={formData.email} />
                <Input name="password" type="password" placeholder="Password" onChange={handleChange} value={formData.password} />
                <Button type="submit" text="Log In" />
                <Link to='/'>
      <Button text={'Home'} />
      </Link>
            </form>
            {error && <p className='error-message'>{error}</p>}
        </div>
    );
};

export default Login;
