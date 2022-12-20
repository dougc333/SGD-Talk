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
      addBubbles:'',
      commentPhoto:'',
      logged_in:'',
      areYouLoggedIn:''
    }
  }

  componentDidMount(){
    
    let fm = this.state.prevProps.userIdArr
    let en = this.props.isEngage
    //console.log("UserList componentDidMount this.state before init:",this.state)
    this.setState({userId:fm,engage:en,areYouLoggedIn:this.props.isLoggedIn,logged_in:this.props.photoShareLoginState}
      //,
      //function(){console.log("UserList componentDidMount after setState:",this.state)
    //}
    )
  }
  
  //called if we call setState in componentDidMount, else this isnt called
  componentDidUpdate(){
    
    if(this.props!==undefined && this.props.isLoggedIn!==undefined)
    {    
      if(this.props.isLoggedIn!==this.state.areYouLoggedIn)
      { 
        //console.log('UserList componentDidUpdate setLogin and web request!!!!!!!!!!! this.props:',this.props)
        //console.log('UserList componentDidUpdate setLogin and web request!!!!!!!!!!! this.prevProps.:',this.state.prevProps)
        //console.log('UserList componentDidUpdate setLogin and web request!!!!!!!!!!! this.props.isLoggedIn:',this.props.isLoggedIn)        
        //console.log('UserList componentDidUpdate setLogin and web request!!!!!!!!!!! this.state.areYouLoggedIn:',this.state.areYouLoggedIn)
        //console.log('UserList componentDidUpdate setLogin and web request!!!!!!!!!!! this.props.userIdArr:',this.props.userIdArr)
        //console.log('UserList componentDidUpdate setLogin and web request!!!!!!!!!!! this.state.userId:',this.state.userId)
        let arr=[]
        for (let i=0;i<this.state.prevProps.userIdArr.length;i++){
          //console.log("UserList componentDidUpdate setLogin and web request!!!!!!!!!!! componentDidMount id:",this.state.prevProps.userIdArr[i]._id)
          Axios.get(`http://localhost:3000/commentsOfUser/${this.state.prevProps.userIdArr[i]._id}`).then(data=>{
          //console.log("componentDidMount data:",data)
           let obj ={
            'id':this.state.prevProps.userIdArr[i]._id,
            'numComments':data.data.numPhotos,
            'numPhotos': data.data.numComments
           }
           arr.push(obj)
          }) //end then
          .catch(error=>console.log(error))
        }//end for
        //console.log("componentDidMount arr:", arr)
        this.setState({commentPhoto:arr,areYouLoggedIn:this.props.isLoggedIn})

      }
      if(this.props && this.props.userIdArr.length>1 && this.props.userIdArr!==this.state.userId){
        //console.log("UserList componentDidUpdate userIDArr valid and setState to this.state.userId!!!!!")
        this.setState({userId:this.props.userIdArr},function(){
          //console.log("UserList componentDidUpdate this.state.userId after setState!!!!!!!",this.state)
        })
      }
    }
  }
  //
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



  append(){
    let e=[]
    //console.log("************UserList append this.state.userId:",this.state.userId)
    if(this.state.userId && this.state.userId.length>1){
      //console.log("************UserList append this.state.userId VALID:")
      this.state.userId.map(x=>{
        e.push(
          <div key={x._id}>
          <ListItem >
            <ListItemText onClick = {this.handleClick} value={x._id} primary={x.first_name+" "+x.last_name}></ListItemText>
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
