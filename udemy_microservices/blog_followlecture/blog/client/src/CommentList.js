import React,{useState,useEffect} from "react";
import axios from "axios";

const CommentList = ({id})=>{
  const [comments, setComments]=useState([])

  const fetchData = async ()=>{
    const data = await axios.get(`http://localhost:4001/posts/${id}/comments`)
    setComments(data.data)
  }

  useEffect(()=>{
    fetchData()
  },[])
  
  const list_me = comments.map(x=>{
    return <li key={x.id}>{x.content}</li>
  })

  return(
    <ul>{list_me}</ul>
  )

}







export default CommentList