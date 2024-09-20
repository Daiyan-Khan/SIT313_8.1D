import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new React 18 API
import './css/index.css';
import App from './App';

// Create a root for the React app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
