
import React, {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

//https://www.youtube.com/watch?v=QQYeipc_cik&t=1077s

//useEffect with count
export const FirstExample = ()=>{
  const [name, setName] = useState("")
  const [count, setCount] = useState(0)
  let myRef = React.createRef<HTMLHeadingElement>()
  let explainRef = React.createRef<HTMLElement>()

  useEffect(()=>{
    const printHere = myRef.current
    printHere.innerText = `First Example useEffect ${count},time: ${new Date().valueOf()}`
    console.log("useEffect First Example")
    console.log("with no dependency array useEffect runs every time the FC is rendered")
  })
  

  return (
    <>
      <h6 ref={myRef}></h6>
      <p >With no dependency array useEffect runs every time the FC is rendered</p>
      <InputGroup.Text >Count: {count} Time:{new Date().valueOf()}</InputGroup.Text>
      <Button onClick={e=>{setCount(prev=>prev+1)}}>Increment</Button>
    </>
  )
}