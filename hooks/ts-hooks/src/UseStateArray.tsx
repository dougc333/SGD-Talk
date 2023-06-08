import {useState} from 'react'
import './usestate.css'

const UseStateArray = ()=>{
  const [arr, setArr] = useState<number[]>([])
  const [nullValue, setNullValue] = useState<string | null>(null)


  console.log("arr:",arr,typeof(arr))
  return (
    <div style={{margin:'auto'}}>
      <>This arr is: </> 
        <div className="Overflow">
        {JSON.stringify(arr)}
        </div>
      <button  onClick={()=>{setArr([...arr,arr.length+1])}}>UseStateArray</button>, 
      <div>
        NullValue: {nullValue}
        <button onClick={()=>{setNullValue("hi")}} >UseStateArray</button>,  
      </div>
    </div>
    
  )
}



export default UseStateArray