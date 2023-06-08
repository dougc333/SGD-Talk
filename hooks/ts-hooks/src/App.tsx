import './App.css';
import UseStateComponent from './UseStateComponent';
import UseStateArray from './UseStateArray';

const styles = {
  'display': 'inline-block',
  'marginLeft': '.5rem'
}


function App() {
  return (
    <div className="App">
      
      SomeVal: <span style={styles}> 
      <UseStateComponent /></span>
      <></>
      <UseStateArray></UseStateArray>
    </div>
  );
}

export default App;
