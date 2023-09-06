import {useState} from 'react'

interface Person{
  name: string,
  age: number
}

const formStyle = {
  border: '1px solid black',
  
}

const inputStyle = {
  font: 'bold',
  fontSize: '1.2rem',

}

const labelStyle = {
  display:'flex',
  fontWeight: '900',
  fontSize: '1.2rem',
  border: '1px solid red',
  marginLeft: 10,
  paddingLeft:5,
} 

const h2Style = {
  textAlign: 'left',
  border: '1px solid green',
} as React.CSSProperties;



const makePerson=()=>{
  return {name:"john", age:10}
}

const UseStateObject=()=>{
  const [Person, setPerson] = useState<Person[]>()
 
  return (
    <form style={formStyle} onSubmit={makePerson}>
      <h2 style={h2Style}>Person:</h2>
      <label style={labelStyle}>Name:<input style={inputStyle} name="name" placeholder="bob" /></label>
      <label style={labelStyle}>age:<input style={inputStyle}  placeholder='10' /></label>
      <h2 style={h2Style}>Hotel Expenses:</h2>
      <label style={labelStyle}>Cost of Hotel:<input style={inputStyle}  placeholder='Hotel Expenses' /></label>
      
    
      <h2 style={h2Style}>Registration Expenses:</h2>
        <label style={labelStyle}>Cost of Registration:<input style={inputStyle}  placeholder='Registration Expenses' /></label>
      <button >Submit</button>
      </form>
  )

}

export default UseStateObject
