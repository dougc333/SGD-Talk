
import React from 'react';
import ReactDOM from 'react-dom';
import TestComp from './TestComp'

const REACT_VERSION = React.version

{console.log(REACT_VERSION)}

ReactDOM.render(
  <React.StrictMode>
    <TestComp></TestComp>
  </React.StrictMode>,
  document.getElementById('tc')
)

