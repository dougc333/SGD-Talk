import InputGroup  from "react-bootstrap/InputGroup"
import {useState, useEffect} from 'react'

export const UseEffectTimerInfiniteFn = ()=>{
  const[number, setNumber] = useState(0)

  useEffect(()=>{
    console.log("UseEFFECT TimerWorks")
    setInterval(()=>{
      setNumber((prev)=>prev+1) 
    },1000)
  },[])

  return <InputGroup.Text>{number}</InputGroup.Text>
} 