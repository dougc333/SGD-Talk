import {Button} from '@mui/material'
import {useState} from 'react'


const FirstComp = ()=>{
  const [value, setValue] = useState(0)
  return (
    <div>
      {console.log("return FirstComp called")}
      <div>{value}</div>
      <Button variant="outlined" onClick={()=>setValue(value+1)}>This is button</Button>
    </div>
  )
}

export default FirstComp

