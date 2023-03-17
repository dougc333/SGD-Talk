import React,{useState} from "react";
import axios from "axios";

const CommentCreate = ({postId})=>{
  const [content, setContent] = useState('')
  const onSubmit = async(e)=>{
    e.preventDefault()
    console.log("CommentCreate postId:",postId)
    console.log("CommentCreate content::",content)
    const foo = `http://localhost:4001/posts/${postId}/comments`
    console.log("foo:",foo)
    await axios.post(foo,{ content, })
    setContent('')
}
  return(
    <>
      <div className="form-group">
        <form onSubmit={onSubmit}>
          <label>Comment</label>
          <input
            onChange={(e)=>setContent(e.target.value)} 
            value={content}
            className="form-control"  />
          <button className="btn btn-primary" >Submit</button>
        </form>
      </div>
    </>
  )
}

export default CommentCreate