import { useState } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button'

interface Foo{
  caption:string;
  pstate: any
}


function Child(props:Foo){
  const {caption} = props;
  const {lines, setLines} = props.pstate;
  console.log(typeof(props),props)
  return <button onClick={() => {
    setLines([...lines, lines.length]);
  }}>
    {caption}
  </button>;
}


function App() {
  const [lines, setLines] = useState<number[]>([0]);  
  return lines.map(m => ( <Child key={m} caption={`Click ${m}`} pstate={{lines, setLines}}/>))}
  


export default App
