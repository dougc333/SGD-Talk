import React from 'react'

type Props= {
  prefix:string,
  state:string[]
}

const filterByPrefix = (props:Props):string[] => { 
  return ["hh"] 
}

export const Filter=(prefix:Props)=>{
  return(
    <div>
    {filterByPrefix(prefix)}
    </div>
  )
}
