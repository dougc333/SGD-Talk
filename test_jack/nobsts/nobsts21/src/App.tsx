import React,{PropsWithChildren, useCallback, useEffect, useState, useReducer, useRef} from 'react';
import './App.css';


const Heading = ({title}: {title:string})=>(<h2>{title}</h2>)

const Box: React.FunctionComponent<PropsWithChildren>=({children})=>(
  <div style={{
    padding:'1rem',
    fontWeight:'bold',
  }}>
    {children}
  </div>
)

const List:React.FunctionComponent<{
  items:string[];
  onClick?: (item:string)=>void;
}> = ({items,onClick})=>(
  <ul>
    {items.map((item,index)=>(
      <li key={index} onClick={()=>(onClick?.(item))}>
          {item}
      </li>
    ))}
  </ul>
)

interface Payload{
  text:string
}

interface Todo{
  id: number
  done:boolean
  text:string
}

type ActionType = 
| { 
    type: "ADD"
    text:string
  }
| {
    type: "REMOVE"
    id:number
  }

function App() {
  const onListClick = useCallback((item:string)=>{alert(item)},[])
  //multipart form? unclear 
  const [payload, setPayload] = useState<Payload | null>(null)

  //useEffect if dependency array empty will only run when fc loaded. 
  //replaces componentdidmount, need other logic for componentwillunmount, componentDidUpdate...
  //

  useEffect(()=>{
    fetch('data.json')
    .then((resp)=>(resp.json()))
    .then((data)=>(setPayload(data)))
  },[])


  const [todos, dispatch] = useReducer((state:Todo[],action:ActionType)=>{
    switch(action.type){
      case "ADD":
        return(
          [...state,
          {
            id:state.length,
            text:action.text,
            done:false
          }]
        )
      case "REMOVE":
        return(
          state.filter(({id})=>(id !== action.id))
        )
      default:
        throw new Error()
    }
  },[])
  
  return (
    <div className="app">
      <Heading title="Introduction" />
      <Box>I am Box</Box>
      <List items={["one","twp","three"]} onClick={onListClick}></List>
      <Box>{JSON.stringify(payload)}</Box>
    </div>
  );
}

export default App;
