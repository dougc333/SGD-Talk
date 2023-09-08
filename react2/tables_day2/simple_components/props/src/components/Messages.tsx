import React from 'react'
import { MessageType } from '../utils/types'
import { MessageStyles } from '../utils/styles'

//max-w-6xl mx-auto mt-5 text-3xl


type Props = {
  message:MessageType;
}

//pass in prop for data which is message object. 
export const Messages = ({message}:Props)=>{
  {console.log(message.content)}
  return(
    <>
    <MessageStyles onContextMenu={(e)=>{
      console.log('context menu clicked')
      e.preventDefault();
    }}
    >
    {message.content}
    </MessageStyles>
    
    </>
  )
}

