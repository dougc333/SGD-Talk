import {useState} from 'react'


const UseStateArray = ()=>{
  const [arr, setArr] = useState<number[]>([])
  const [nullValue, setNullValue] = useState<string | null>(null)
  

  console.log("arr:",arr,typeof(arr))
  return (
    <div>
    {JSON.stringify(arr)}
    <button onClick={()=>{setArr([...arr,arr.length+1])}}>UseStateArray</button>, 
    NullValue: {nullValue}
    <button onClick={()=>{setNullValue("hi")}}>UseStateArray</button>,  
      </div>
    
  )
}



export default UseStateArray