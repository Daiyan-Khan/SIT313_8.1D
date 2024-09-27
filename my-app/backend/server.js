const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // To handle cross-origin requests from the frontend
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json()); // To parse JSON body in requests
app.use(cors()); // Allow requests from other origins (e.g., from React frontend)

// Example route to handle newsletter subscription
app.post('/subscribe', (req, res) => {
  const { email } = req.body;

  // Basic email validation
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Invalid email address.' });
  }

  // Sending welcome email (optional)
  const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Access the email user from .env
    pass: process.env.EMAIL_PASS, // Access the email password from .env
  },
});


  const mailOptions = {
    from: 'iamdaiyankhan@gmail.com',
    to: email,
    subject: 'Welcome to the Newsletter!',
    text: 'Thank you for subscribing to our newsletter!',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Failed to send welcome email.' });
    }

    res.json({ success: true, message: 'Subscription successful! Welcome email sent.' });
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

