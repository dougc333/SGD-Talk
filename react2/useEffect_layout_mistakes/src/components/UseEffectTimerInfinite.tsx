import InputGroup  from "react-bootstrap/InputGroup"
import {useState, useEffect} from 'react'

export const UseEffectTimerInfinite = ()=>{
  const[number, setNumber] = useState(0)

  useEffect(()=>{
    console.log("UseEFFECT TimerInfinite")
    setInterval(()=>{
      setNumber(number+1) /* need (prev)=>prev+1*/
    },1000)
  },[number])

  return <InputGroup.Text>{number}</InputGroup.Text>
} 