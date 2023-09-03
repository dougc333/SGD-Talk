import React from 'react'
import { useState,useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button'
import Form from  'react-bootstrap/Form'

//refs not a good design choice
//https://medium.com/@martin_hotell/react-refs-with-typescript-a32d56c4d315


function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  console.count("Renders twice on each call for React18! Add a cleanup function for 1 render")
  //use AbortController and clean up fn. 

  useEffect(()=>{
    console.log("USEEFFECT ")
    document.title = `${count} clicks`
    // const h2 =  document.getElementById('a')!
    // h2.innerHTML=`using innerHTML ${count}`
    // myRef.current!.innerHTML=`using React ref count:${count}`
    //document.title = `document title: Count:${count}`
  },[count])
  //add the dependency array to prevent running when
  //updating count

   let myRef = React.createRef<HTMLHeadingElement>()
  

  return (
    <>
    <h2 id="a" ref={myRef}></h2>
    <Form>
    <Form.Group>
      <Form.Label>Enter Some Text</Form.Label>
      <Form.Control onChange = {(e)=>{
        setName(e.target.value)
        }} type="text" placeholder="Hello" />
        <Form.Label>{name}</Form.Label>
    </Form.Group>
    </Form>
      <Button href="#" onClick = {(e)=>{
        console.log("button")
        setCount((prev)=>prev+1)
      }}>Increment </Button>
      <div>{count}</div> 
    </>
  )
}

export default App
