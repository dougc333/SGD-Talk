import React, {useState} from 'react'
import {TextField, FormControl, Button}  from '@mui/material'


const LoginForm = ()=>{
  const [email, setEmail] = useState('')
  const [password,setPassword]  = useState('')
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  
  const handleSubmit = (event)=>{
    event.preventDefault()
 
    setEmailError(false)
    setPasswordError(false)
    if (email == '') {
      setEmailError(true)
    }
    if (password == '') {
      setPasswordError(true)
    }
    if (email && password) {
      console.log(email, password)
    }
  }
  
  return (
    <>
    <form autoComplete='off' onSubmit={handleSubmit}>
      <h2>Login</h2>
      <TextField
        label="Email"
        onChange={e=>setEmail(e.target.value)}
        required
        variant="outlined"
        color="secondary"
        type="email"
        sx={{mb: 3}}
        value={email}
        error={emailError}
      />
      <TextField 
        label="Password"
        variant="outlined"
        color="secondary"
        type="password"
        error={passwordError}
        sx={{mb: 3}}
      />
      <div>
      <Button 
        variant="outlined"
        color="secondary"
        type="submit"
      >Login</Button>
      </div>
    </form>
    <small>Need an account <a href="">Register</a></small>
    </>
  )

}

export default LoginForm