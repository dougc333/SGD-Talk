import React from 'react';
import {
  Typography,Link
} from '@material-ui/core';
import './userDetail.css';
import Axios from 'axios';


class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      usrid:this.props.match.params.userId,
      fetch_usrdet:'',
      addComment:'',
      mostRecentPhoto:'',
      mostCommentsPhoto:'',
    }     
  }
  
  //this is still used? 
  handleComment=(c)=>{
    console.log("UserDetail handleCOmment:",c)
    this.setState({addComment:c},function(){
      //console.log("UserDetail handleComment setState completed:",this.state)
    })
  }

  componentDidMount(){
    console.log("UserDetail componentDidMount prevProps:",this.state.prevProps)
    console.log("UserDetail componentDidMount props:",this.state.props)
    Axios.get(`http://localhost:3000/user/${this.props.match.params.userId}`)
    .then(response=>{
      console.log("UserDetail componentDidMount /user/:id then response",response); 
      console.log("UserDetail componentDidMount /user/:id then response.data",response.data); 
       this.setState({fetch_usrdet:response.data}
       ,function(){
       console.log("UserDetail componentDidMount fetch this.state.fetch_userdet:",this.state.fetch_usrdet)
       console.log("componentDidMount get /user/:id verify state:",this.state)
       }
      )})
    .catch(error=>console.log(error))
     
    Axios.get(`http://localhost:3000/mostRecentPhoto/${this.props.match.params.userId}`)
    .then(response=>{
      console.log('UserDetail componentDidMount /mostRecentPhoto/:id then response:',response)
      console.log('UserDetail componentDidMount /mostRecentPhoto/:id then response.data:',response.data)
      this.setState({mostRecentPhoto:response.data},function(){
        console.log("UserDetail componentDidMount setting mostRecentPhoto:",this.state.mostRecentPhoto)
        console.log("UserDetail componentDidMount /mostRecentPhoto/:id verify state:",this.state)
      })
    })
    .catch(error=>console.log("mostRecentPhoto error:",error))
    
    Axios.get(`http://localhost:3000/mostCommentsPhoto/${this.props.match.params.userId}`)
    .then(response=>{
      console.log('UserDetail componentDidMount /mostCommentsPhoto/:id then response:',response)
      console.log('UserDetail componentDidMount /mostCommentsPhoto/:id then response.data:',response.data)
      this.setState({mostCommentsPhoto:response.data},function(){
        console.log("UserDetail componentDidMount setting mostCommentsPhoto:",this.state.mostCommentsPhoto)
      })
    })
    .catch(error=>console.log("mostCommentsPhoto error:",error))
    
  }

  //update userDetail display here
  componentDidUpdate(){
    console.log("UserDetail componentDidUpdate this.props.match.params.userId:",this.props.match.params.userId)
    console.log("UserDetail componentDidUpdate fetch_userdet:",this.fetch_usrdet)
    console.log("UserDetail componentDidUpdate this.state.usrid:",this.state.usrid) //do we use this? no!!!
    
    
    if (this.state.usrid !== this.props.match.params.userId){
      Axios.get(`http://localhost:3000/user/${this.props.match.params.userId}`)
      .then(response=>{
        console.log("UserDetail componentDidUpdate /user/id: then resonse:",response); 
        this.setState({fetch_usrdet:response.data,usrid:this.props.match.params.userId}
        ,function(){
          console.log("UserDetail componentDidUpdate this.state.fetch_userdet:",this.state.fetch_usrdet)
        }
        )})
      .catch(error=>console.log("componentDidUpdate /user/id error",error))
      
      Axios.get(`http://localhost:3000/mostRecentPhoto/${this.props.match.params.userId}`)
      .then(response=>{
        this.setState({mostRecentPhoto:response.data}
        ,function(){
          console.log("UserDetail componentDidUpdate setting mostRecentPhoto:",this.state.mostRecentPhoto)
          console.log("verify state componentDidUpdate /mostRecentPhoto/:id",this.state)
        }
        )})
        .catch(error=>console.log("mostRecentPhoto error:",error))
        
        Axios.get(`http://localhost:3000/mostCommentsPhoto/${this.props.match.params.userId}`)
        .then(response=>{
          console.log("UserDetail componentDidUpdate /mostCommentsPhoto/:id then response:",response); 
          this.setState({mostCommentsPhoto:response.data},function(){
            console.log("UserDetail componentDidUpdate setting mostCommentsPhoto:",this.state.mostCommentsPhoto)
            console.log("verify state componentDidUpdate /mostCommentsPhoto/:id",this.state)
          })
        })
        .catch(error=>console.log("mostCommentsPhoto error:",error))
    }//end if  
  }//end componentDidUPdate
 
 
  appendMe=()=>{
    console.log("appendMe this.props.match.params.userId:",this.props.match.params.userId)
    console.log("appendMe this.state.fetch_usrdet:",this.state.fetch_usrdet)                 
    return (
      <Typography component={'div'} color="primary" key={this.state.fetch_usrdet._id}>
        <div>{this.state.fetch_usrdet.first_name+" "+this.state.fetch_usrdet.last_name }</div>
        <div  className="txt-color">Description:{this.state.fetch_usrdet.description}</div>
        <div  className="txt-color">Location:{this.state.fetch_usrdet.location}</div>
        <div  className="txt-color">Occupation:{this.state.fetch_usrdet.occupation}</div>
      </Typography>
    
    )
  }
  //this link is removed after project8
  appendLink=()=>{
    console.log("UserDetail appendLink: propsUserId:",this.props.match.params.userId)
    return( 
      <Link className='photo-link' color="secondary" href={'http://localhost:3000/photo-share.html#/photos/'+this.props.match.params.userId}>Photos</Link>
    )
  }
// <img src={'/images/'+this.state.mostCommentsPhoto} />
  appendPhotos=()=>{
    let arr=[]
    console.log("UserDetail appendPhotos() state:",this.state)
    if(this.state.mostRecentPhoto){
    arr.push((
      <div key={Math.random()}>
        <Typography color="primary">Most Recent Photo:{this.state.mostRecentPhoto.file_name}  </Typography>
        <a href={'http://localhost:3000/photo-share.html#/photos/'+this.props.match.params.userId}>
        <img className='img-style' 
          src={"/images/"+this.state.mostRecentPhoto.file_name}
          height="128" width="128" 
        />
        </a>
        <Typography color="secondary">Date_time:{this.state.mostRecentPhoto.date_time}</Typography>
      </div>
    ))
    }
    if(this.state.mostCommentsPhoto){
      arr.push (
        <div key={Math.random()}>
          <Typography color="primary">Most Commented Photo:{this.state.mostCommentsPhoto.file_name}  </Typography>
          <a href={'http://localhost:3000/photo-share.html#/photos/'+this.props.match.params.userId}>
          <img className='img-style' 
            src={"/images/"+this.state.mostCommentsPhoto.file_name}
            height="128" width="128" 
          />
          </a>
          <Typography color="secondary">NumComments:{this.state.mostCommentsPhoto.numComments}</Typography>
        </div>
      ) 
    }
    return arr
  }

  render() {
    return (
      <div id="ud">
        <Typography variant="h3">User Detail</Typography>
        {this.appendMe()}
        <Typography variant="body1">
        {this.appendLink()}
        </Typography>
        {this.appendPhotos()}
      </div>
    ); //end return
  }
}

export default UserDetail;
