import {useState,useEffect, useCallback} from 'react'

type User={
  id:string;
  name:string;
}

const USERS=[
  {
    name:"bob",
    id:1
  },{
    name:"ann",
    id:2
  },{
    name:"leo",
    id:3
  }
]

const awaitTimeout = (delay:number)=>{
  new Promise((resolve)=>setTimeout(resolve,delay))
}


export const useGetUsers = ()=>{
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<User[]>()
  
  const loadUsers = useCallback(async()=>{
    await awaitTimeout(300)
    setUsers(USERS)
    setLoading(false)
  },[])

  useEffect(()=>{
    loadUsers()
  },[loadUsers])

  return {users, loading} 
}
