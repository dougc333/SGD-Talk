import React from "react"
import PostCreate  from "./PostCreate"
import PostList from "./PostList";

const App = ()=>{
    return (
        <div className="container">
          <h1>Create Post</h1>
            <PostCreate />
            <div>
                <hr></hr>
                <h1>Posts</h1>
                <PostList></PostList>
            </div>
            <div>this is app component in blog app</div>
        </div>
    )
}

export default App