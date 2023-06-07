import './App.css';
import UseStateComponent from './UseStateComponent';
import UseStateArray from './UseStateArray';

const styles = {
  'display': 'inline-block',
  'margin-left': '.5rem'
}


function App() {
  return (
    <div className="App">
      SomeVal: <span style={styles}> 
      <UseStateComponent /></span>
    
      <>This arr is:</> 
      <UseStateArray></UseStateArray>
    </div>
  );
}

export default App;
