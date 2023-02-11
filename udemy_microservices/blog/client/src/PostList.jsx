import React,{useEffect, useState} from "react"
import axios from "axios"

const PostList = ()=>{
    const [posts, setPosts] = useState({})    
    console.log("POST LIST")
    const fetchPosts = async ()=>{
        console.log("POST LIST calling get")
        const res = await axios.get("http://localhost:4000/posts")
        setPosts(res.data)
    }

    useEffect(()=>{
        console.log("USE EFFECT")
        fetchPosts()
    },[])

    console.log("POST LIST COMPONENNT posts:",posts)
    return(
        <div>PostList</div>
    )

}


export default PostList