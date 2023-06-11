import {useState} from 'react'
import './usestate.css'

const styles = {
  'display': 'inline-block',
  'marginLeft': '.5rem',
  'height': 'auto',
  'width': '50',
  'border': '1px solid black',
}

const UseStateComponent = ()=>{
  const [arr, setArr] = useState<number[]>([])
  const [name, setName] = useState<string | null>(null)
  return(
    <div>
     arr: <span style={styles}> 
    <button className="Overflow" onClick={()=>setArr([...arr,arr.length+1])}>Add to Array</button>
      {JSON.stringify(arr)}</span>
    <div>
     <button onClick={()=>setName("foo")}>Click to Set </button>
     </div>
     <div>
     name:{name}
    </div>
    </div>
    )
}



export default UseStateComponent