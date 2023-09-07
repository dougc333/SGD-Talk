
import React, {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
//https://www.youtube.com/watch?v=QQYeipc_cik&t=1077s
import Container from 'react-bootstrap/Container'
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
    <Stack gap={3}>
      <h6 ref={myRef}></h6>
      <p >With no dependency array useEffect runs every time the FC is rendered</p>
      <InputGroup.Text >Count: {count} Time:{new Date().valueOf()}</InputGroup.Text>
      <Button className="mt-auto" onClick={e=>{setCount(prev=>prev+1)}}>Increment</Button>
      </Stack>
    </>
  )
}