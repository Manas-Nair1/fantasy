import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Function to run the Python program
const runPythonProgram = () => {
  fetch('http://localhost:5000/sentiment') // Replace with your backend server URL
    .then(response => response.json())
    .then(data => {
      console.log(data); // Handle the response from the backend server
    })
    .catch(error => console.error('Error:', error));
};

// Call the function to run the Python program
runPythonProgram();

// Render the React application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
