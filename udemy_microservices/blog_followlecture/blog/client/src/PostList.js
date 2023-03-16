import React,{useEffect, useState} from 'react'
import axios from 'axios'

const PostList=()=>{
    const [posts,setPosts] = useState({})
    const getPosts=async ()=>{
     const p = await axios.get('http://localhost:4000/posts')
     setPosts(p.data)
    }
    useEffect(()=>{getPosts()},[])
    console.log(posts)
    const list_em = Object.values(posts).map(x=>{
        return(
            <>
              <div
                key={x.id}
                className="card">
                {x.title}
              </div>
              <div className="card-body">
                <h3>{x.title}</h3>
              </div>
            </>
        )
    })

    return (
        <div className = 'd-flex flex-row flex-wrap justify-content-between'>
            {list_em}
        </div>
    )
    
}

export default PostList