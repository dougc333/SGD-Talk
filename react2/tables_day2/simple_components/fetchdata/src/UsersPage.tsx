import { isHtmlElement } from "react-router-dom/dist/dom"
import {Link} from "react-router-dom"
import {useState} from 'react'
import {useGetUsers} from './useGetUsers'





export const UsersPage = ()=>{
  const {users, loading} = useGetUsers()

  if (loading) return <div>Loading Users</div>

  return(
    <div className="users-container">
      <h1>Users Page</h1>  
      <Link to="/">Back to Home</Link>
      <p>List of Users</p>
      <div className="users-list">
        {users?.map((user)=>(
          <Link className="user-list-item" key={user.id} to={user.id}>
            {user.name}
          </Link>
        ))}

      </div>
    </div>
  )
}