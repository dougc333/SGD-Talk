



import React, {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
//https://www.youtube.com/watch?v=QQYeipc_cik&t=1077s
//3.23 The second example shows useEffect being run when another 
//state variable is being changed, 

//useEffect with count
export const FourthExample = ()=>{
  const [name, setName] = useState("")
  const [count, setCount] = useState(0)
  
  let myRef = React.createRef<HTMLHeadingElement>()
 

  useEffect(()=>{
    const printHere = myRef.current
    printHere.innerText = `This should not change. Second Example useEffect ${count},time: ${new Date().valueOf()}`
  },[])
  

  return (
    <>
    <Stack gap={3}>
      <h6 ref={myRef}></h6>
      <p >With no dependency array useEffect runs every time the FC is rendered</p>
      <Form.Control onChange = {(e)=>{setName(e.target.value)}} placeholder='enter name ' ></Form.Control>
      <InputGroup.Text>Name:{name}</InputGroup.Text>
      Count:{count}
      <Button className="mt-auto" onClick={()=>{setCount(prev=>prev+1)}}>Increment</Button>

      </Stack>
    </>
  )
}