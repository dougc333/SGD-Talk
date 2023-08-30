import React from 'react';
import ReactDOM from 'react-dom';
import InputStuff from './InputStuff';
import BootstrapInput  from './BootstrapInput';
const REACT_VERSION = React.version

{console.log(REACT_VERSION)}

ReactDOM.render(
  <React.StrictMode>
  <InputStuff/>,
  <BootstrapInput></BootstrapInput>,
  </React.StrictMode>,
  document.getElementById('day2Extra')
)

