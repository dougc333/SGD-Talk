import React from 'react';
import { Messages } from './Messages';
import { MessageType } from '../utils/types'
import { ContentMenu } from '../utils/styles';


type Props = {
  messages: MessageType[]
}

export const MessageContainer = ({messages}:Props)=>{
  return(
    <div>
    {messages.map((m)=>(
      <Messages key={m.id} message={m} />
    ))}
    <ContentMenu />
    </div>
    
  )
}