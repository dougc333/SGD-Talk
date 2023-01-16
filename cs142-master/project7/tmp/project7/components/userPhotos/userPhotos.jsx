import React from 'react';
import {
  Typography,Link,TextField
} from '@material-ui/core';
import './userPhotos.css';
import Axios from 'axios'
import PopUP from './popUP'

/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    //console.log("UserPhotos ctor userId:",this.props.match.params.userId)
    this.state={
      photos: '',
      userId: this.props.match.params.userId,
      prevProps:props,
      login_info:''
    }
  }
  
  componentDidMount(){
    this.setState({login_info:this.props.userLoginInfo})
    Axios.get(`http://localhost:3000/photosOfUser/${this.props.match.params.userId}`)
    .then(response=>{
      this.setState({photos:response.data,userId:this.props.match.params.userId,isMounted:true}
      //,function(){
      //console.log("UserPhotos ctor this.state.photos:",this.state.photos)
      //}
    )})
    .catch(error=>console.log(error))
  }

  componentDidUpdate(){
    //console.log("UserPhotos componentDidUpdate userId:",this.props.match.params.userId)
    if (this.state.userId !== this.props.match.params.userId){
    Axios.get(`http://localhost:3000/photosOfUser/${this.props.match.params.userId}`)
    .then(response=>{
     // console.log("UserPhotos componentDidUpdate then data",data); 
      this.setState({photos:response.data,userId:this.props.match.params.userId}
     // ,function(){
      //console.log("UserPhotos componentDidUpdate this.state.photos:",this.state.photos)
      //}
    )})
    .catch(error=>console.log(error))
    }
  }
  componentWillUnmount(){
    //console.log('UserPhotos unmount')
    //this.handlePhotos(false)
  }

  addPhotos(){
    let userPhotos=[]
   // console.log("addPhotos")
   // console.log("addPhotos userId:",this.props.match.params.userId)
    //console.log("addPhotos this.state.photos:",this.state.photos)
   //console.log("addPhotos this.state:",this.state)

    for (let i=0;i<(this.state.photos.length);i++){
      //console.log("USER PHOTOS addPhotos:",this.state.photos[i]) 
      userPhotos.push(
        <img className='img-style'
          key={this.state.photos[i].file_name} 
          src={ '/images/'+this.state.photos[i].file_name} 
        />
        )
      userPhotos.push(
        <div key={this.state.photos[i]._id}>
        <Typography color="primary">id:{" "+this.state.photos[i]._id}</Typography>
         <div key={this.state.photos[i].date_time}>
         <Typography color="primary">Time:{" "+this.state.photos[i].date_time}</Typography>
          <div key={this.state.photos[i].file_name}>
          <Typography color="primary">FileName:{" "+this.state.photos[i].file_name}</Typography>
        </div>
        <PopUP value='this.state.photos[i]._id' photoID={this.state.photos[i]._id} />
        </div>
        </div>

       )
      if(this.state.photos[i].comments!==undefined){
        //console.log("addPhotos comments:",this.state.photos[i].comments) 
        for (let j=0;j<this.state.photos[i].comments.length;j++){
          //console.log("addPhotos comments user:",this.state.photos[i].comments[j].user) 
          //console.log("addPhotos comments user _id:",this.state.photos[i].comments[j].user._id) 
          userPhotos.push(
            <Typography component="div" variant="body2" key={Math.random()}>
                <div>
                  <div>
                    <Typography color="primary">Comments:</Typography>
                    <Link color="primary" 
                        href={'http://localhost:3000/photo-share.html#/users/'+
                        this.state.photos[i].comments[j].user._id}>User
                    </Link>
                    {" "+this.state.photos[i].comments[j].user.first_name+" "} 
                  {this.state.photos[i].comments[j].user.last_name+" :"}</div>
                  <div>{this.state.photos[i].comments[j].comment}  </div>
                </div>
            </Typography>  
          )
        }//end for
        userPhotos.push(<div key={Math.random()} id={this.state.photos[i]._id}>Adding Comments Here</div>)
      }//end comments 
    }
    return userPhotos  
  }//end addPhotos

  render() {
    return (
      <Typography component={"div"} variant="body1">
        {this.addPhotos()}
      </Typography>
    );
  }
}

export default UserPhotos;