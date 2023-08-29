import React from 'react';
import ReactDOM from 'react-dom';
import HerrDay2 from './HerrDay2';
import InputStuff from './InputStuff';

const REACT_VERSION = React.version

{console.log(REACT_VERSION)}

ReactDOM.render(
  <React.StrictMode>
  <HerrDay2/>,
  <InputStuff/>,
  <InputStuffWithNoHooks />
  </React.StrictMode>,
  document.getElementById('day2')
)

