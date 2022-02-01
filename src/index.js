import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Logger from './services/LoggerService';
import reportWebVitals from './reportWebVitals';
import './index.css';

// Error Logging & Performance Monitoring System w/ Sentry.io
// Logger();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
