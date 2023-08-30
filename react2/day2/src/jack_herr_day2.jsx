import React from 'react';
import ReactDOM from 'react-dom';
import InputStuff from './InputStuff';
import HerrTable from './Table';

const REACT_VERSION = React.version

{console.log(REACT_VERSION)}

ReactDOM.render(
  <React.StrictMode>
  <HerrTable></HerrTable> 
  </React.StrictMode>,
  document.getElementById('day2')
)

