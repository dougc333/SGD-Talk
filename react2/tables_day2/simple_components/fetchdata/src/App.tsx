import { useState,useEffect } from 'react'
import './App.css'
import {Link} from 'react-router-dom'

const NLSYRow = (nlsyrow:{})=> {
  console.log(Object.keys(nlsyrow))
  return <div>Object.keys(nlsyrow)</div>
}

function App() {
  const [nlsy, setNLSY] = useState([])
  
  useEffect( ()=>{
    async function fetchStuff(){
      console.log("component mounted")
      const resp = await fetch('http://localhost:3000/NLSY2.json')
      const stuff = await resp.json();
      if (stuff) setNLSY(stuff)
      //console.log("useEffect data:", stuff)
    }
    fetchStuff()
  },[])

  let accuulator:any=[]
  
  return (
    <>
    <h1 className="text-3xl font-bold underline">
    Test
    </h1>
    {nlsy.map((rows,idx)=>{
      if (idx<10) {
        console.log(rows["R0000100"])
        // return <div>{rows["R0000100"]}</div>
      }
      if (idx>10 && idx<20){
        console.log("typeof:",typeof(Object.keys(rows)))
        console.log("Object.keys",Object.keys(rows))
        accuulator.push(<div>typeof(Object.keys(rows))</div>)
        
        //return Object.keys(rows)
        Object.keys(rows).map(x=>{
          console.log("x:",x)
          return {...accuulator}
        })
      }
    }) 
    
    }
    </>
  )
}
//console.log("idx:",idx+" item:",item)
//x=>`${JSON.stringify(x)}`
export default App
