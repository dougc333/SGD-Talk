import React from 'react'
import { useState,useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button'

//refs not a good design choice
//https://medium.com/@martin_hotell/react-refs-with-typescript-a32d56c4d315


function App() {
  const [count, setCount] = useState(0)

  console.count("Renders twice on each call for React18! Add a cleanup function for 1 render")
  //use AbortController and clean up fn. 
  
  useEffect(()=>{
    const h2 =  document.getElementById('a')!
    h2.innerHTML=`using innerHTML ${count}`
    myRef.current!.innerHTML=`using React ref count:${count}`
    document.title = `document title: Count:${count}`
  })

  let myRef = React.createRef<HTMLHeadingElement>()
  //both methods suck

  return (
    <>
    <h2 id="a" ref={myRef}></h2>
      <Button href="#" onClick = {(e)=>{
        e.preventDefault()
        console.log(e)
        setCount((prev)=>prev+1)
      }}>Link </Button>
      <div>{count}</div> 
      <Button type="submit">Button</Button>{' '}
      <Button as="input" type="button" value="Input" />{' '}
      <Button as="input" type="submit" value="Submit" />{' '}
      <Button as="input" type="reset" value="Reset" />
    </>
  )
}

export default App
