import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LoginPlain from './login';
import Simple from './simple';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginPlain></LoginPlain>
    <Simple></Simple>
  </React.StrictMode>
);

