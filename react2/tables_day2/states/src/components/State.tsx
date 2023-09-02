import React from 'react'

type Props= {
  state:string
}

export const State=(props:Props)=>{
  return(
    <div>
    {props.state}
    </div>
  )
}
