
//this runs useEffect only once on init, same as componentDidMOunt
//or componentIsMounted
import {useState, useEffect} from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

export const UseEffectOnce = ()=>{
  
  const [_name, setName] = useState("Initial Name")
  const [_number, setNumber] = useState(0)

  useEffect(()=>{
    console.log("USE EFFECT SHOULD ONLY SEE ONCE")
    console.log("USE EFFECT runs 2x on start because R18")
    console.log("BECAUSE OF THE EMPTY DEPENDENCY ARRAY")
    console.log("_name:",_name)
    setName("number "+_number)
  },[])

  return (
    <>
    <InputGroup>
    <InputGroup.Text >Name:{_name}</InputGroup.Text>
      <Button onClick={()=>{
        setNumber( prev => prev+1 )
        }}> Increment
      </Button>
      <InputGroup.Text >Number:{_number}</InputGroup.Text>
      </InputGroup>
      
    </>
  )
}