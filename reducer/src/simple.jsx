import React from "react"


export default function Simple(){
    const onSubmit = async e =>{
        e.preventDefault();
        alert("aaa")
    }

    return(
        <div>
        <form onSubmit={onSubmit} >
            <input type="text" placeholder="user" />
            <button type="submit">Login</button>
        </form>
        </div>
    )
}