import Button from 'react-bootstrap/Button'
import {useEffect, useState} from 'react'
import InputGroup from 'react-bootstrap/InputGroup'

export const UseEffectCleanup = ()=>{
  const [toggle, setToggle] = useState(false)
  const [number, setNumber] = useState(0)
  
  useEffect(()=>{
    console.log("USE EFFECT UseEffectCleanup", {toggle})
    const interval = setInterval(()=>{
      setNumber(prev=>prev+1)

    },1000)
    
    return ()=>{
      console.log("useEffect return fn")
      clearInterval(interval)
    }
  },[number])

  return (
    <>
    <InputGroup.Text>{toggle.toString()}</InputGroup.Text>
    <hr />
    <InputGroup.Text>{number} cleaning</InputGroup.Text>
    <Button onClick = {(e)=>{setToggle(!toggle)}}>Toggle </Button>
    </>
  )

}