import React,{useState} from 'react'
import axios from 'axios'



const PostCreate=()=>{
    const [title,setTitle] = useState('')

    const onSubmit=async(e)=>{
        e.preventDefault()
        await axios.post('http://localhost:4000',{
            title
        })
        setTitle('')
    }
    return(
        <div>
            <form className="form-group" onSubmit={onSubmit}>
                <label>Post Title</label>
                <input 
                  value = {title}
                  onChange={e=>setTitle(e.target.value)}
                  className="form-control" 
                  />
                <button className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default PostCreate