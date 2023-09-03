import {useState, useEffect, useMemo} from 'react';

import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export const UseEffectTripleEqualsUseFixAddObjectFields = ()=>{
  const [name, setName] = useState("")
  const [User, setUser] = useState({
    name:"",
    age: Number,
    selected:false,
  })

  useEffect(()=>{
    console.log("FixMEmo USE EFFECT")
    console.log("fix 1 add all the fields into the dependency array")
  },[User.name, User.age, User.selected])

  const setUserName =()=>{
    setUser((prev)=>({...prev,name}))
  }
  const setUserSelected=()=>{
    setUser((prev)=>({...prev,selected:true}))
  }

  return (
    <>
    <h4>UseEffectTripleEqualsUseMemoFix </h4>
    <p>Usememo is a fix when triple equal doesnt between objects or arrays doesnt resolve to true. </p>
    <Form.Control placeholder="foo" onChange={(e)=>setName(e.target.value)} />
    <InputGroup>
      <InputGroup.Text>{`{
        User.name:${User.name},
        User.age: ${User.age},
        User.selected: ${User.selected},
      }`}
      </InputGroup.Text>
      <Button onClick={setUserName}>Set Name</Button>
      <Button onClick = {setUserSelected}>Set Selected</Button>
    </InputGroup>
    </>
  )

}








