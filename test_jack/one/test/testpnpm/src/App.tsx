import React, { PropsWithChildren, useCallback } from 'react';
import './App.css'
import styled from '@emotion/styled'

const Heading = (props:{title:string})=> <h2>{props.title}</h2>
const Button = styled.button`
  color:turquoise;
  height:20px;
  width:200px;
`


const Box:React.FunctionComponent<PropsWithChildren> = ({children})=>(
  <div style = {{
    border:'1px solid red;',
    padding: '1rem',
    fontWeight: 'bold',
    fontSize: '1rem', 
    }} >
    {children}
  </div>
)


const List:React.FunctionComponent< {
  items:string[];
  onClick?: (item:string)=>void 
  }> = ({items,onClick})=>(
  <ul>
    {items.map((item,index) =>(
      <li key={index} onClick={()=>onClick?.(item)} >{item}</li>
    ))}
  </ul>
)

function App() {
  const onListClick = useCallback((item:string)=>{alert(item)},[])
  return (
    <div>
      <Heading title='This is Heading'/>
      <Box>This is box</Box>
      <List items={["first","second","third"]} onClick={onListClick}></List>
      <Button></Button>
    </div>
  );

export default App;
