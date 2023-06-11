
import {useState} from 'react'
import makeUpperCase from './utilities.js'
import AsyncLoadComponent from './AsyncLoadComponent'
import Header from './Header'

//the bundle includes the data. 
//how to split this? 
//this is different than fetch. 
function App() {
  const [names, setNames] = useState()
  //const [anotherName, setAnotherName] = useState(null)
  //import a function different than decl. 
  const load = async ()=>{
    const names = (await import ('./names.js')).default
      
    const makeUpperCase = (
      await import ('./utilities' /*webpackChunkName: "data" */)).makeUpperCase
      setNames(makeUpperCase(names));
   
  }
  
  return (
    <div className="App">
      <Header></Header>
    <button onClick={load}>Load</button>
    {JSON.stringify(names)},
    <AsyncLoadComponent></AsyncLoadComponent>
    </div>
  );
}

export default App;
