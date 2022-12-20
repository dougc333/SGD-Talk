import React from 'react';
import {
  BrowserRouter, Route, Switch
} from 'react-router-dom';
import {
  Typography,Button
} from '@material-ui/core';
import './userPhotos.css';
//import { cloneNode } from '@babel/types';
import fetchModel from '../../lib/fetchModelData'
import Axios from 'axios';

/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class SinglePhoto extends React.Component {
    constructor(props) {
      super(props);
      console.log("SinglePhotos ctor userId:",this.props.match.params.userId)
      this.state={
        photos: '',
        userId: this.props.match.params.userId,
        photoId:'',
        prevProps:props,
        extra:''
      }
    }
  
    componentDidMount(){
      console.log("SinglePhoto componentDidMount props:",this.state.prevProps)
      this.handlePhotos(true)
      //console.log("UserPhotos componentDidMount userId:",this.props.match.params.userId)
      //console.log("UserPhotos componentDidMount photos:",this.state.photos)
      Axios.get(`http://localhost:3000/photosOfUser/${this.props.match.params.userId}`)
      .then(response=>{
        console.log("SinglePhotos ctor then data",response.data); 
        this.setState({photos:response.data,userId:this.props.match.params.userId,isMounted:true}
        //,function(){
        //console.log("UserPhotos ctor this.state.photos:",this.state.photos)
        //}
      )})
      .catch(error=>console.log(error))
    }
  
    handlePhotos=(t)=>{
      this.props.didMount(t)
    }
    componentDidUpdate(){
      console.log("SinglePhoto componentDidUpdate userId:",this.props.match.params.userId)
      if (this.state.userId !== this.props.match.params.userId){
      Axios.get(`http://localhost:3000/photosOfUser/${this.props.match.params.userId}`)
      .then(response=>{
       // console.log("UserPhotos componentDidUpdate then data",data); 
        this.setState({photos:response.data,userId:this.props.match.params.userId}
        //,function(){
        //console.log("SinglePhoto componentDidUpdate this.state.photos:",this.state.photos)
        //}
      )})
      .catch(error=>console.log(error))
      }
    }
    componentWillUnmount(){
      console.log('SinglePhoto unmount')
      this.handlePhotos(false)
    }

    handleClick(e){
      console.log("singlephoto handleClick:",e)
      console.log("singlephoto handleClick target:",e.target)
      console.log("singlephoto handleClick currentTarget:",e.currentTarget)
      console.log("singlephoto handleClick currentTarget.value:",e.currentTarget.value)
      //this.setState({extra:"asfasdfasdf"})
    }
    

    renderShirts(){
      console.log("singlePhoto renderShirts")
    }
    addPhotos(){
      let userPhotos=[]
      console.log("SinglePhoto addPhotos")
      console.log("SinglePhoto addPhotos userId:",this.props.match.params.userId)
      console.log("SinglePhoto addPhotos photoId:",this.props.match.params.photoId)
      console.log("SinglePhoto addPhotos this.state.photos:",this.state.photos)
      //this.state.photos.length
      if (this.state.photos.length > 0){
        //console.log("addPhotos:",this.state.photos[i]) 
        userPhotos.push(
          <img className='img-style'
            key={this.state.photos[0]._id} 
            src={ '/images/'+this.state.photos[0].file_name} 
          />)
        if(this.state.photos[0].comments!==undefined){
          //console.log("addPhotos comments:",this.state.photos[i].comments) 
          for (let j=0;j<this.state.photos[0].comments.length;j++){
            //console.log("addPhotos comments user:",this.state.photos[i].comments[j].user) 
            //console.log("addPhotos comments user _id:",this.state.photos[i].comments[j].user._id) 
            userPhotos.push(
              <Typography component="div" variant="body2" key={Math.random()}>
                  <div key={Math.random()}>
                    <div>
                      {" "+this.state.photos[0].comments[j].user.first_name+" "} 
                    {this.state.photos[0].comments[j].user.last_name+" :"}
                    {this.state.photos[0].comments[j].comment}  </div>
                  </div>
              </Typography>  
            )
          }
        }//end comments
        //<Redirect to = {`/users/${this.props.match.params.userId/this.state.photos[0]._id}`} />
        //
        {console.log("redirect this.props.match.params.userId:",this.props.match.params.userId)}
        {console.log("redirect this.state.photos[0]._id:",this.state.photos[0]._id)}
        userPhotos.push(
            <div key={Math.random()}>
              <div>
                <Button color="primary" onClick={this.handleClick} value={this.state.photos[0].id}> Left</Button>
              </div>
                <Button color="primary" onClick={this.handleClick} value={this.state.photos[1]._id}>Right</Button>
           
            <Switch>
            <Route path = '/:userId/:photoId' render = {routerProps => this.renderShirts(routerProps)} />
            </Switch>
            </div>
        )
        
      }
      return userPhotos  
    }//end addPhotos
  //
    render() {
      return (
        <Typography component={"div"} variant="body1">
          {this.addPhotos()}
        </Typography>
      );
    }
  }
  
  export default SinglePhoto;
  