import React from 'react'
import {useState} from 'react'
import {TextField, FormControl, Button} from '@mui/material'
import Link from 'react-router-dom'



const LoginForm=()=>{
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const handleSubmit=(e)=>{
    e.preventDefault()

    setEmailError(false)
    setPasswordError(false)

    if (email ==''){
      setEmailError(true)
    }
    if (password ==''){
      setPasswordError(true)
    }

  }
  return (
    <React.Fragment>
    <form action="" autoComplete='off' onSubmit={handleSubmit} >
      <h2>Login</h2>
      <TextField
       label="Email"
       onChange = {e=>setEmail(e.target.value)}
       
       
       
      >  
      </TextField>      
      
      
      
    </form>  
    </React.Fragment>
  )

}


export default LoginForm