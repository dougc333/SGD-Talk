import {useState, useEffect} from 'react'

import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'



export const UseEffectTripleEquals = ()=>{
  const [name, setName] = useState("")
  const [state,setState] = useState({
    name:"",
    selected:false,
  })
  
  useEffect(()=>{
    console.log("state changed, USEEFFECT")
  },[state])

  const addName = ()=>{
    setState((prev)=>({...prev, name}))
  }
  const setSelected = ()=>{
    setState((prev)=>({...prev,selected:true}))
  }

  return(
    <>
    <input type="text" placeholder='text here' onChange={(e)=>setName(e.target.value)} />
    {`{
      name:${state.name},
      selected:${JSON.stringify(state.selected)}
    }`}
    <button onClick={addName}>Add Name</button>
    <button onClick={setSelected}>Set Selected True</button>
    <p>Add name to input box verify with Button click on SetName, 
      click on Set selected button to set false to true and observer Useeffect running. 
      Then click on selected true which doesnt change the state but it triggers a rerende. 
      What is wrong? Because object state is not changed, JS cant do a triple equal comparison
      object===object if the key:value are same resolves as false. 
    </p>
    </>
  )



}

