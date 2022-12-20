import React, { Component } from "react";



class PopUP extends Component {
  constructor(props){
    super(props)
    this.state={
      add_comment:''
    }
  }

  handleClick = () => {
   this.props.toggle();
  };

  handleSubmit=(e)=>{
    e.preventDefault()
    console.log(" PopUP handleSubmit:",e)
    console.log("PopUP handleSubmit event.target.value:",event.target.value)
    console.log("PopUP handleSubmit this.state:",this.state)
    //do db access
    this.props.handleComment(this.state.add_comment) 
  }
  commentChange=(event)=>{
    console.log("PopUP commentChange event.target.value:",event.target.value)
    this.setState({add_comment:event.target.value},function(){
      console.log("popUP commentChange this.state:",this.state)
    })
    
  }

render() {
  return (
   <div >
     <div >
     <span className="close" onClick={this.handleClick}> </span>
     <p>Add Comment</p>
     <form>
            <h3>Register!</h3>
            <label>
              Comment:
              <input type="text" name="name"  onChange={this.commentChange}/>
            </label>
            <br />
            <input type="submit" onClick={this.handleSubmit} />
          </form>
    </div>
   </div>
  );
 }
}

export default PopUP