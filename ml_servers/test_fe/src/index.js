import React from 'react'
import ReactDOM from 'react-dom'


const App=()=>{
   return(<div>
     <h4>Hi</h4>
     <p>hi this is react</p>
   </div> )
}

ReactDOM.render(<App/>,
    document.getElementById("main")
);