import React  from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,Badge,circle
}
from '@material-ui/core';
import './userList.css';
import CommentIcon from '@material-ui/icons/Comment';
import PhotoIcon from '@material-ui/icons/Photo';
import Axios from 'axios'
var async = require('async');
/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      userId : '',
      clickedUser:'',
      current_userId:'',
      prevProps:props,
      engage:'',
      addBubbles:'',
      commentPhoto:''
    }
  }

  componentDidMount(){
    //console.log('UserList componentDidMount props:',this.state.prevProps)
    let fm = this.state.prevProps.userIdArr
    let en = this.props.isEngage
    this.setState({userId:fm,engage:en})
    let arr=[]
    for (let i=0;i<this.state.prevProps.userIdArr.length;i++){
      console.log("componentDidMount id:",this.state.prevProps.userIdArr[i]._id)
      Axios.get(`http://localhost:3000/commentsOfUser/${this.state.prevProps.userIdArr[i]._id}`).then(data=>{
        console.log("componentDidMount data:",data)
        let obj ={
          'id':this.state.prevProps.userIdArr[i]._id,
          'numComments':data.data.numPhotos,
          'numPhotos': data.data.numComments
        }
        arr.push(obj)
      }) //end then
      .catch(error=>console.log(error))
    }//end for
    console.log("componentDidMount arr:", arr)
    this.setState({commentPhoto:arr})
  }
  
  //called if we call setState in componentDidMount, else this isnt called
  componentDidUpdate(){
    //console.log("userList componentDidUpdate,this.state:",this.state)
    //console.log("componentDidUpdate props:",this.props)
    if(this.props.isEngage!==this.state.engage){
       this.setState({engage:this.props.isEngage})
    }    
  }

  handleNewUser = (event) =>{
    this.props.onNewUserID(event.currentTarget.getAttribute('value'))
  }

  handleClick=(event)=>{ 
    this.setState({
      clickedUser:event.target.childNodes[0],
      current_userId:event.currentTarget.getAttribute('value')},()=>{
        //console.log("verify state UserList:",this.state)
      })
    this.handleNewUser(event)
  }

  addBubbles(id){
    console.log("addBubbles:id",id,this.state.engage,this.props.isEngage)
    console.log(this.state.commentPhoto.find(x=>x.id===id))
    return(
      <div>
      <CommentIcon className='badge' ></CommentIcon>
      <Badge color="primary" badgeContent={this.state.commentPhoto.find(x=>x.id===id).numComments} >
      {circle}
      </Badge>
      <PhotoIcon></PhotoIcon>
      <Badge color="secondary" badgeContent={this.state.commentPhoto.find(x=>x.id===id).numPhotos} >
      {circle}
      </Badge>
      </div>
      )
  }

  append(){
    let e=[]
    //console.log("************UserList append this.state.userId:",this.state.userId)
    if(this.state.userId.length>1){
      this.state.userId.map(x=>{
        e.push(
          <div key={x._id}>
          <ListItem >
            <ListItemText onClick = {this.handleClick} value={x._id} primary={x.first_name+" "+x.last_name}></ListItemText>
            {(this.props.isEngage===true) ? this.addBubbles(x._id):0 }

          </ListItem>
          <Divider />
          </div>
      )  
      })
    }
    return e
  }

  render() {
    return (
        <List component="nav">
           {this.append()}
        </List>
    );
  }
}

export default UserList;
