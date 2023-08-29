import React from 'react';
import "./InputStuffWithNoHooks.css"



class InputStuffWithNoHooks extends React.Component {
  constructor(props){
    super(props)
  }
  
  render(){
    return(
      <div className="outline">Can I mix FC and Components</div>
    )
  }
}

export default InputStuffWithNoHooks



