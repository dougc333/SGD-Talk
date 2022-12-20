import React  from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
}
from '@material-ui/core';
import './userList.css';

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
    }
  }

  componentDidMount(){
    //console.log('UserList componentDidMount props:',this.state.prevProps)
    let fm = this.state.prevProps.userIdArr
    this.setState({userId:fm})
  }
  
  //called if we call setState in componentDidMount, else this isnt called
  componentDidUpdate(){
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

  append(){
    let e=[]
    //console.log("************UserList append this.state.userId:",this.state.userId)
    if(this.state.userId.length>1){
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
