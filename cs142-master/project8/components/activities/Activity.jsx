import React from 'react';
import {
  TextField,Button, Typography
} from '@material-ui/core';
import axios from 'axios';
import './Activity.css';


class Activity extends React.Component{
  constructor(props){
    super(props)
    this.state={
      user_id:'',
      display_results:'',
      login_info:''
    }
  }

  componentDidMount(){
    console.log("Activity componentDidMount this.props.loginInfo", this.props.loginInfo)
    if(this.props.loginInfo!==undefined){
      this.setState({login_info:this.props.loginInfo},function(){
        console.log("Activity componentDidMount state:",this.state)
      })
    }
  }

  componentDidUpdate(){
    console.log("Activity componentDidUpdate this.state.user_id:",this.state.user_id, " this.props.userId:", this.props.userId)
    if(this.state.user_id!==this.props.userId){
      this.setState({user_id:this.props.userId})
      console.log("ACTIVITY componentDidUpdate:",this.state.login_info.userId)
      axios.get('http://localhost:3000/act/')
      .then(res=>{
        console.log("res:",res.data)
        this.setState({display_results:res.data})
      })
      .catch(err=>console.log(err))
  
    }
  }

  format(){
    let arr=[]
    for (let i=0;i<this.state.display_results.length;i++){
      console.log(this.state.display_results[i])
      if(this.state.display_results[i].type==='login' ||this.state.display_results[i].type==='logout' || this.state.display_results[i].type==='registerNew'){
        arr.push(
        <div key={Math.random()}>
        <Typography color="primary">Activity Type:{this.state.display_results[i].type}</Typography>  
        <Typography color="secondary">Date_time:{this.state.display_results[i].date_time}</Typography>
        </div>
        )
      }
      if(this.state.display_results[i].type==='addComment'){
        arr.push(
          <div key={Math.random()}>
          <Typography color="primary">Activity Type:{this.state.display_results[i].type}</Typography>  
          <Typography color="secondary">Date_time:{this.state.display_results[i].date_time}</Typography>
          <Typography color="secondary">Name:{this.state.display_results[i].first_name+" "}{this.state.display_results[i].last_name}</Typography> 
          <Typography color="secondary">File Name:{this.state.display_results[i].file_name}</Typography>
          <img src={ '/images/'+this.state.display_results[i].file_name} className="thumbnail-style" />
          </div>
          )
      }
      if(this.state.display_results[i].type==='uploadPhoto'){
        arr.push(
          <div key={Math.random()}>
          <Typography color="primary">Activity Type:{this.state.display_results[i].type}</Typography>  
          <Typography color="secondary">Date_time:{this.state.display_results[i].date_time}</Typography>
          <Typography color="secondary">File Name:{this.state.display_results[i].file_name}</Typography>
          <img src={'./images/'+ this.state.display_results[i].file_name} className="thumbnail-style"/>         
          </div>
          )
      }
    }

    return arr;
  }

  render(){
    return(
      <div>
       {this.format()}
      </div>
    );
  }
}//end Component

export default Activity