import React from 'react';
import {
  Typography,Link,Grid,Button
} from '@material-ui/core';
import './userPhotos.css';
import Axios from 'axios'
import PopUP from './popUP'
import CloseIcon from '@material-ui/icons/Close';

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
      login_info:'',
      login_name:'',
    }
  }
  
  componentDidMount(){
    this.setState({login_info:this.props.userLoginInfo,login_name:this.props.loginName})
    console.log("USERPHOTO LOGIN_INFO this.state:",this.state)
    console.log("USERPHOTO LOGIN_INFO this.props.userLoginInfo:",this.props.userLoginInfo)
    console.log("USERPHOTO LOGIN_NAME:",this.props.loginName)
    
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
    console.log("UserPhotos componentDidUpdate userId:",this.props.match.params.userId)
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
  
  
  deleteComment=(e)=>{ 
    console.log("userPhotos deletComment e:",e)
    //console.log("should see commentID!!!!!",e.currentTarget.outerHTML)
    console.log("should see commentID!!!!!",e.currentTarget.getAttribute("value")) 
    //console.log("type:",typeof(e.currentTarget.getAttribute("value")))
    console.log("UserPhotos deleteComment photoId:",e.currentTarget.getAttribute("photo_id"))
    let myObj = {
      "photo_id":e.currentTarget.getAttribute("photo_id"),
      "comment_id":e.currentTarget.getAttribute("value")
    }
    Axios.post('http://localhost:3000/deleteComment/',myObj)
    .then(response=>{
      console.log("deleteComment response:",response)
      //delete the div! from teh dom! or hide it. This doesnt owrk. 
      //cached in browser
      if(response.status===200){
        console.log("USER PHOTOS comment deleted!!!!!! ")
      }
      //if response code is 200, use setState to update the display

    })
    .catch(error=>console.log("deleteComment http get error",error))
    
  }

  deletePhoto=(e)=>{
    console.log("userPhotos deletePhoto e:",e)
    console.log("UserPhotos deletePhoto photoid:",e.currentTarget.getAttribute("photoid"))
    Axios.get(`http://localhost:3000/deletePhoto/${e.currentTarget.getAttribute("photoid")}`,)
    .then(response=>{
      console.log("deletePhoto response:",response)
      //delete the div! from teh dom! or hide it. This doesnt owrk. 
      //cached in browser
      if(response.status===200){
        console.log("USER PHOTOS photo deleted!!!!!! ")
      }
      //if response code is 200, use setState to update the display
      //that doesnt work!!

    })
    .catch(error=>console.log("deletePhoto http get error",error))
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
        <Grid container spacing={2} key={Math.random()}>
          <Grid  key={Math.random()} item>
              <img className='img-style'
              key={this.state.photos[i].file_name} 
              src={ '/images/'+this.state.photos[i].file_name} 
              />
          </Grid>
          <Grid  key={Math.random()} item>
            <CloseIcon  onClick={this.deletePhoto} key={Math.random()} photoid={this.state.photos[i]._id} className="closeicon-style"></CloseIcon>
          </Grid>
        </Grid>
        )
      userPhotos.push(
        <div key={this.state.photos[i]._id}>
        <Typography color="primary">id:{" "+this.state.photos[i]._id}</Typography>
         <div key={this.state.photos[i].date_time}>
         <Typography color="primary">Time:{" "+this.state.photos[i].date_time}</Typography>
          <div key={this.state.photos[i].file_name}>
          <Typography color="primary">FileName:{" "+this.state.photos[i].file_name}</Typography>
        </div>
        <PopUP value='this.state.photos[i]._id' photoID={this.state.photos[i]._id} 
          photoName={this.state.photos[i].file_name} 
          loginName={this.state.login_name} />
        </div>
        </div>

       )
      if(this.state.photos[i].comments!==undefined){
        console.log("addPhotos comments:",this.state.photos[i].comments) 
        for (let j=0;j<this.state.photos[i].comments.length;j++){
          console.log("addPhotos comments user:",this.state.photos[i].comments[j].user) 
          console.log("addPhotos comments user _id:",this.state.photos[i].comments[j].user._id) 
          console.log("addPhotos this.state.photos[i]:",this.state.photos[i])
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
                     <Button onClick={this.deleteComment} photo_id={this.state.photos[i]._id} value={this.state.photos[i].comments[j]._id} key={this.state.photos[i].comments[j]._id}>Delete Comment</Button>
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
