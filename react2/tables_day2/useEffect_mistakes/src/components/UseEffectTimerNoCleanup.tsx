import InputGroup  from "react-bootstrap/InputGroup"
import {useState, useEffect} from 'react'

export const UseEffectTimerCleanup = ()=>{
  const[number, setNumber] = useState(0)

  useEffect(()=>{
    console.log("UseEFFECT TimerInfinite")
  })

  return <InputGroup.Text>{number}</InputGroup.Text>
} 