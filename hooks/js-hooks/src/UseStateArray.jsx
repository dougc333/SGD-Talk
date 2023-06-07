
import {useState} from 'react'


const formatArray = (arr)=>{
  console.log(arr.length)
  if (arr.length===0){
    return "0 or [], there is no array for zero elements" 
  }else if (arr.length >= 1){
    return JSON.stringify(arr)
  }
} 

const UseStateArray = ()=>{
  const [arr, setArr] = useState([])

	return (
	  <div>
      Arr:
	  <button onClick={ ()=>(setArr([...arr, arr.length+1.0])) }>Click </button>,
    {formatArray(arr)}
		</div>
	)


}

export default UseStateArray


