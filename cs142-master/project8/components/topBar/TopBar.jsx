import React from 'react';
import {
  AppBar, Toolbar, Typography,Checkbox,Button
} from '@material-ui/core';
import './TopBar.css';
import axios from 'axios'
import AlertDialog from './AlertDialog'
/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      prevProps:props,
      name:'',
      old:'',
      checked:false,
      login_info:'',
      addPhoto:true,
      userId:'', //do I need this? this.props.usrid is userName for display, can we use this object?
      logged_out:false,
      numPhoto:0,
    }
  }

  componentDidUpdate=()=>{
    //console.log("topbar componentdidupdate prevProps:",this.state.prevProps)
    //console.log("topbar componentdidupdate props:",this.props)
    //console.log("topbar componentdidupdate this.props.photoInfo;",this.props.photoInfo)
    //console.log("topbar componentdidupdate this.props.loginInfo:",this.props.loginInfo)
    //console.log("topbar componentdidupdate this.state.prevProps.login_info:",this.state.prevProps.login_info)
    //console.log("topbar componentdidupdate this.state:",this.state)
    //console.log("topbar componentdidupdate this.state.prevProps.login_info.login_name:",this.state.prevProps.login_info.login_name)
    //console.log("topbar componentdidupdate this.props.loginInfo.login_name:",this.props.loginInfo.login_name)
   
    if (this.state.old!==this.props.photoInfo){
      //console.log("topbar componentdidupdate photoInfo setState this.state!!!!!!:",this.state)
      if(this.props.photoInfo===true){
        this.setState({name:"Photo",old:this.props.photoInfo})
      }else{
        this.setState({name:"Name",old:this.props.photoInfo})
      }
    }
    if(this.state.login_info!==this.props.loginInfo){
      //console.log("topbar componentDidUpdate login_info setState login_name!!!!!")
      this.setState({login_info:this.props.loginInfo,logged_out:false})
      //this.displayLogin()
    }else{
      //console.log("topbar componentDidUpdate no login update")
    }
  }

  handleChange=()=>{
    //console.log("topbar handleChange e.currentTarget.value",e.currentTarget.value)
    //console.log("handleChange topbar checked before setState:",this.state.checked)
    //console.log("topbar handleChange event.currentTarget.getAttribute('value')",event.currentTarget.getAttribute('value'))
    this.setState({checked:!this.state.checked},function(){
      this.props.onCheckBox(this.state.checked); 
      //console.log("topBar handleChange checked:",this.state.checked)
    })
  }
  
  foo=()=>{
    console.log("foo login_info:",this.state.login_info);
    //do teh server calls here then
    axios.get(`http://localhost:3000/deleteUser/${this.state.login_info.userId}`)
    .then(res=>{
      console.log("res from get/deleteUser:",res)
    })
    .catch(error=>console.log("get deleteUser error:",error))
    //do Logout wont work cause... user doesnt exist anymore. 
    //axios.post('/admin/logout',{})
    //.then(resLogout=>console.log(resLogout))
    //.catch(errLogout=>console.log(errLogout))

  }
  
  displayLogin=()=>{
    if(this.state.login_info!=='' && this.state.login_info!==undefined){
      return(
        <div className="parent">
          <div className="children left-children">
        <AlertDialog foo={this.foo}/>
        <a href='http://localhost:3000/photo-share.html#/activities'>
          <Button><span className="logout-button-style">Activities</span></Button>
        </a>
        </div>
        <Typography variant="h6" color="inherit" component='span' style={{ flex: 1 }}>
          Login Name: {this.state.login_info.login_name} 
        </Typography>
        </div>
      )
    }else if(this.state.login_name===''){
      return(
        <div>
      <Typography variant="h6" color="inherit" component='span' style={{ flex: 1 }}>
         Please Login: {this.state.login_info.login_name} 
      </Typography>
      <Button><span className='logout-button-style' >Logout</span></Button>
      </div>
      )
    }
  }

  handleDeleteUser=(e)=>{
    console.log("topbar delete user!!!")
    console.log("topbar login info:",this.state.login_info)
    //do the confirm dialog component! 
    Axios.get(`/deleteUser/${this.state.login_info.userId}`)
    .then((res)=>{
      console.log("deleteuser get response res:",res)
    })
    .catch(err=>console.log("error deleteUser get request",err))
  }
  
  //need function from parent, photoshare
  //remove this.setState logged_out.
  handleLogout=()=>{
    //console.log("********topbar logout!!!!!! this.state:",this.state)
    this.props.onLogOut()
    this.setState({logged_out:true})
  }

  clickPhotoButton=()=>{
    //console.log("topbar clickPhotoButton this.state:",this.state)
    this.setState({addPhoto:!this.state.addPhoto,numPhoto:this.state.numPhoto+1})
    this.props.photoStatus(this.state.numPhoto)
  }
 
  handleUploadButtonClicked = (e) => {
    e.preventDefault();
    
    if (this.uploadInput.files.length > 0) {
     // Create a DOM form and add the file to it under the name uploadedphoto
     const domForm = new FormData();
     domForm.append('uploadedphoto', this.uploadInput.files[0]);
     axios.post('http://localhost:3000/photos/new', domForm)
       .then((res) => {
         console.log("photo upload response need ID:",res);
         let photoObj = {
           id:res.data._id,
           file_name:res.data.file_name,
           user_id:res.data.user_id,
           type:"uploadPhoto",
         }
         this.photoUploadActivity(photoObj)
       })
       .catch(err => console.log(`POST ERR: ${err}`));
     //how to get photoID? 
     //has to be returned on photoPost
     
    }
   this.setState({addPhoto:!this.state.addPhoto})
  }
  
  photoUploadActivity=(pObj)=>{
    axios.post('http://localhost:3000/addAct/',pObj)
    .then(res=>{
      console.log("TopBar uploadPhoto res:",res)
    })
    .catch(err=>console.log("TopBar logout err:",err))

  }

  displayAddPhoto(){
    if(this.state.addPhoto===true){
      return(
        <Button onClick={this.clickPhotoButton}><span className="logout-button-style">Add Photo</span></Button>
      );   
    }else{
      return(
        <div>
        <input type="file" accept="image/*" ref={(domFileRef) => { this.uploadInput = domFileRef; }} />
        <Button  onClick={this.handleUploadButtonClicked}><span className="logout-button-style"> Upload File</span></Button>
        </div>
      );
    }
  }

  render() {
    
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute" >
        <Toolbar>
          <Typography variant="h6" color="inherit" component='span' style={{ flex: 1 }}>
          Name:DC
          </Typography> 
          {this.displayLogin()}
          {this.displayAddPhoto()}
         
          <Button onClick={this.handleLogout}><span className="logout-button-style">Logout</span></Button>
          <Typography variant="h6" color="inherit" component='span' style={{ flex: 1 }}>
          User {this.state.name} :{this.props.usr_name}
          </Typography>
        </Toolbar>
        
      </AppBar>
    );
  }
}

export default TopBar;
