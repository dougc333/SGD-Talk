import React from "react"
import { useState } from "react"
import './login.css'
import { login } from "./utils"



export default function LoginPlain(){
    const [username, setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading, setIsLoading] =  useState(false)
    const [error, setError] = useState('')
    const [isLoggedIn, setisLoggedIn] = useState(false)

    const onSubmit = async e=>{
        e.preventDefault()
               
        setIsLoading(true)
        setError('')

        try{
            console.log({username, password})
            await login({username, password})
            setIsLoading(false)
            setisLoggedIn(true)
            setUsername('')
            setPassword('')
            setError('')

        }catch(error){
            setError('Incorret username or password')
        }
    }

    return (
        <div className="App">
            <div className="login-container" text-align="center">
                <form  onSubmit={onSubmit}>
                <p>Please Login</p>
                <input 
                type="text"
                placeholder="username"
                value={username}
                onChange={e=>setUsername(e.currentTarget.value)}
                />
                <input 
                type="text" 
                placeholder="password"
                value={password}
                onChange={e=>setPassword(e.currentTarget.value)}
                />

                <button  type="submit" disabled={isLoading} >{isLoading ? 'Logging In' : "Login"}</button>
                </form>
            </div>
        </div>
            
    )


}