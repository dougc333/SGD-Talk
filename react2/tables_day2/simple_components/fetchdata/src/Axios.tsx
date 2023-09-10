import { useState,useEffect } from 'react'
import axios  from 'axios'


const Axios = ()=>{
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

}