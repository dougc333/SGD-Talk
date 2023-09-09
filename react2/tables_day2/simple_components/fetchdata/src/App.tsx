import { useState,useEffect } from 'react'
import './App.css'
import axios  from 'axios'

const NLSYRow = (nlsyrow:{})=> {
  console.log(Object.keys(nlsyrow))
  return <div>Object.keys(nlsyrow)</div>
}

function App() {
  const [inProgress, setInProgress] = useState(false)
  const [error, setError] = useState(null)
  const [nlsy, setNLSY] = useState([])
  

  const getData_old = async ()=>{
    //never do this from youtube video
    try{
      setInProgress(false)
      console.log("in progress")
      const response = await axios.get('http://localhost:5173/NLSY2.json')
      const data = response.data
      // console.log("nlsy:", data)
      if (data) setNLSY(data)
    }catch(e:any){
      setError(e)
    }
  }


  useEffect( ()=>{
    async function fetchStuff(){
      console.log("component mounted")
      const resp = await fetch('http://localhost:5173/NLSY2.json')
      const stuff = await resp.json();
      if (stuff) setNLSY(stuff)
      //console.log("useEffect data:", stuff)
    }
    fetchStuff()
  },[])

  if (inProgress) return <div>In Progress</div>
  
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
        //return Object.keys(rows)
        Object.keys(rows).map(x=>{
          console.log("x:",x)
          return {x:x}
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
