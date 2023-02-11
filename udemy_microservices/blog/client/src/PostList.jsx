import React,{useEffect, useState} from "react"
import axios from "axios"

const PostList = ()=>{
    const [posts, setPosts] = useState({})    
    console.log("POST LIST")

    const fetchPosts = async ()=>{
        console.log("POST LIST calling get")
        const res = await axios.get("http://localhost:4000/posts")
        setPosts(res.data)
        console.log("fetchPosts posts:",res.data)
    }

    useEffect(()=>{
        console.log("USE EFFECT")
        fetchPosts()
    },[])
    const renderedPosts = Object.values(posts).map((post)=>{
        console.log("renderedPosts posts:",posts)
        return(
            <div 
              className="card"
              style={{width:"30%",marginBottom:"20px"}}
              key={post.id}
            >
            <div className="card-body">
                <h3>{post.title}</h3>
            </div>
            </div>
        )
    })
    console.log("POST LIST COMPONENNT posts:",posts)
    return(
        <div className="d-flex flex-row flex-wrap justify-content-btween">
            {renderedPosts}
        </div>
    )
}


export default PostList