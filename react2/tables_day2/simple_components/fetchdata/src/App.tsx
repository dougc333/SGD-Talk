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
  

  const getData = async ()=>{
    try{
      setInProgress(false)
      console.log("in progress")
      const response = await axios.get('http://localhost:5173/NLSY2.json')
      // setTimeout(()=>{
      //   console.log("delay",inProgress)
      //   }, 10000)
      const data = response.data

      // console.log("nlsy:", data)
      if (data) setNLSY(data)
    }catch(e:any){
      setError(e)
    }
  }


  useEffect(()=>{
    console.log("component mounted")
    getData()
  },[])

  if (inProgress) return <div>In Progress</div>
  
  return (
    <>
    <h1 className="text-3xl font-bold underline">
    Test
    </h1>
    {nlsy.forEach(x=>{`${x}`})}
    {/* {JSON.stringify(nlsy[0])},
    {JSON.stringify(nlsy[1])},
    {JSON.stringify(nlsy[2])},
    {JSON.stringify(nlsy[3])},
    {JSON.stringify(nlsy[4])}, */}
    {/* {JSON.stringify(nlsy)} */}
    
    </>
  )
}

export default App
