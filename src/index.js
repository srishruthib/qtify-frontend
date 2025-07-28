import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Note: No .js extension needed here

// You can remove or comment out these lines if they are present:
 import './index.css';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);