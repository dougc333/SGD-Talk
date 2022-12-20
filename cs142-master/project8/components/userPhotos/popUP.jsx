import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import axios from 'axios'
//what is this for? How to use?
//import { Children } from "react";

class PopUP extends Component {
  constructor(props){
    super(props)
    this.state={
      add_comment:'',
      photoID:'',
      photoName:'',
      login_name:'',
    }
  }
  componentDidMount(){
    //console.log("UserPhotos popUP componentDidMount:",this.props)
    console.log("UserPhotos popUP componentDidMOount this.props.photoID:",this.props.photoID," photoName:",this.props.photoName)
    this.setState({photoID:this.props.photoID,photoName:this.props.photoName,login_name:this.props.loginName})
  }
  handleClick = () => {
   this.props.toggle();
  };

  handleSubmit=(e)=>{
    e.preventDefault()
    //console.log("UserPhotos PopUP handleSubmit:",e)
    //console.log("UserPhotos PopUP handleSubmit e.target.value:",e.target.value)
    //console.log("UserPhotos PopUP handleSubmit this.state:",this.state)
    //do db access

    let parent = document.getElementById(this.state.photoID)
    let child = document.createElement("P")
    child.innerText=this.state.add_comment
    parent.appendChild(child)
    //doesnt need userId!! webserver only needs comment!! 
    let commentObj={
      comment:this.state.add_comment
    }
    //console.log("UserPhotos popUP handleSubmit photoID:",this.state.photoID)
    axios.post(`http://localhost:3000/commentsOfPhoto/${this.state.photoID}`,commentObj)
    .then((response)=>{
      //console.log("UserPhoto popUP response:",response)
    })
    .catch(error=>{
      //console.log("UserPhoto popUP comment post error:",error)
    })
    let obj={
      type:"addComment",
      file_name:this.state.photoName,
    }
    console.log('$$$$$$$$USER PHOTO ADD COMMENT POPUP obj:',obj)
    this.activityComment(obj)
  }

  activityComment(commentObj){
    axios.post(`http://localhost:3000/addAct/`,commentObj)
    .then((response)=>{
      console.log("UserPhoto popUP activityComment response:",response)
    })
    .catch(error=>{
      console.log("UserPhoto popUP comment post error:",error)
    })
  }
  commentChange=(event)=>{
    //console.log("UserPhotos PopUP commentChange event.target.value:",event.target.value)
    this.setState({add_comment:event.target.value})
      //,function(){
      //console.log("UserPhotos popUP commentChange this.state:",this.state)
    //})
  }

render() {
  return (
   <div >
     <div >
     <span className="close" onClick={this.handleClick}> </span>
     <Typography color="secondary">Add Comment</Typography>
     <form>
      <label>
        Comment:
        <input type="text" name="name"  onChange={this.commentChange} />
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