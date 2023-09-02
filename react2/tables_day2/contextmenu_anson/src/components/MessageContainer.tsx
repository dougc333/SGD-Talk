import React,{useState,useEffect} from 'react';
import { Messages } from './Messages';
import { MessageType } from '../utils/types'
import { ContentMenu } from '../utils/styles';


type Props = {
  messages: MessageType[]
}

export const MessageContainer = ({messages}:Props)=>{
  const [show,setShow ] = useState(false)
  const [points, setPoints] = useState({x: 0, y: 0})

  useEffect(()=>{
    const handleClick = ()=>{setShow(false)}
    window.addEventListener("click", handleClick)
    return ()=>window.removeEventListener("click", handleClick)
  },[])

  return(
    <div>
    {messages.map((m)=>(
      <div key={Math.random()}
        onContextMenu={(e)=>{
          console.log("context menu opened")
          e.preventDefault()
          setShow(true)
          console.log("pageX: " + e.pageX+" pageY: " + e.pageY)
          setPoints({x: e.pageX, y: e.pageY})
        }}
      >
      <Messages key={m.id} message={m} />
      </div>
    ))}
    
    {show && <ContentMenu  top={points.y} left={points.x}>
      <h1>sfsdf</h1>
      </ContentMenu>}
    </div>
    
  )
}