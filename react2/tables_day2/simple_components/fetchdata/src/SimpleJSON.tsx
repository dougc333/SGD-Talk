import {useState,useEffect} from "react"
import testdata from './test.json'


//lesson learned load data in useEffect, else get infinite loop
//as data is loading it changes the state causing a re-render. 
export const SimpleJSON = ()=>{
  const [data,setData] = useState([{}])
  useEffect(()=>{
    setData(testdata)
    console.log('data',data)
  },[])

  return (
    data.map(x=>{
      console.log("x:",x)
      console.log(typeof(x))
      
      // Object.entries(x).forEach(([key,value])=>{
      //   console.log(`yo!!! ${key}:${value}`)
      // })
       
      return <div>{JSON.stringify(x)}</div>
    })
  )
}

