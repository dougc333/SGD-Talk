import {useState} from 'react'



const UseStateComponent = ()=>{
  const [someVal, setSomeVal] = useState(0)



  return(
    <>
    <button onClick={()=>setSomeVal(someVal+1)}>Some Discernable Text</button>
      {JSON.stringify(someVal)}
    </>
  )



}



export default UseStateComponent