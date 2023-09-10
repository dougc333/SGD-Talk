import {useEffect, useState} from 'react'
import React from 'react'
export const Route = ({path, component})=>{

  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  console.log("path:",path, "component:",component)
  console.log("currentPath:",currentPath)

  useEffect(()=>{
    const navigate = ()=>{
      console.log("currentPath:",currentPath)
      setCurrentPath(window.location.pathname)
      console.log("currentPath:",currentPath)
    }
    window.addEventListener('navigate', navigate)
    return () => window.removeEventListener("navigate", navigate);
  },[])

  console.log("before return component",path, component)
  return currentPath === path ?  component(): null

}