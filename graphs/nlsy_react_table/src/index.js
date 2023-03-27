import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {C} from './C';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <C />
  </React.StrictMode>
);

