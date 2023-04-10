import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css" 
import Counter from './Counter';
import Counter_With_Reducer_Hook from './Counter_with_Reducer_Hook';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <>
    <Counter_With_Reducer_Hook></Counter_With_Reducer_Hook>
    </>
    <>
    <Counter></Counter>
    </>
  </React.StrictMode>
);

