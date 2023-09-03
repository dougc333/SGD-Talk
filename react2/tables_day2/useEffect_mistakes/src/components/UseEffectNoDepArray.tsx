import {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
export const UseEffectNoDepArray = ()=>{

  const [name,setName] = useState('')
  const [number, setNumber] = useState(0)

  useEffect(()=>{
    console.log("USE EFFECT")
    console.log("if there is no dependency array useEffedt runs on any change of any state variable")
    setName("In useEffect")
  })

  return(
    <>  
      <InputGroup className="mb-2">
        <InputGroup.Text>{name}</InputGroup.Text>
        <Form.Control  placeholder="Name here" />
      </InputGroup>
      
        <Button  onClick={()=>{
          setNumber((asdf)=>asdf+1)
        }}>Increment</Button>
        <Form.Label>{number}</Form.Label>

    </>
  )

}