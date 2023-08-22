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



function App() {
  const onListClick = useCallback((item:string)=>{alert(item)},[])
  return (
    <div className="app">
      <Heading title="Introduction" />
      <Box>I am Box</Box>
      <List items={["one","twp","three"]} onClick={onListClick}></List>
    </div>
  );
}

export default App;
