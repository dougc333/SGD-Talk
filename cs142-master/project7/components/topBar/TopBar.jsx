import React from 'react';
import {
  AppBar, Toolbar, Typography,Checkbox,Button
} from '@material-ui/core';
import './TopBar.css';
import axios from 'axios'

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
  
  displayLogin=()=>{
    if(this.state.login_info!=='' && this.state.login_info!==undefined){
      return(
        <Typography variant="h5" color="inherit" component='span' style={{ flex: 1 }}>
          Login Name: {this.state.login_info.login_name} 
        </Typography>
      )
    }else if(this.state.login_name===''){
      return(
        <div>
      <Typography variant="h5" color="inherit" component='span' style={{ flex: 1 }}>
         Please Login: {this.state.login_info.login_name} 
      </Typography>
      <Button><span className='logout-button-style' >Logout</span></Button>
      </div>
      )
    }
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
         //console.log(res);
       })
       .catch(err => console.log(`POST ERR: ${err}`));
   }
   this.setState({addPhoto:!this.state.addPhoto})
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
          <Typography variant="h5" color="inherit" component='span' style={{ flex: 1 }}>
          Name:DC
          </Typography> 
          {this.displayLogin()}
          {this.displayAddPhoto()}
         
          <Button onClick={this.handleLogout}><span className="logout-button-style">Logout</span></Button>
          <Typography variant="h5" color="inherit" component='span' style={{ flex: 1 }}>
          User {this.state.name} :{this.props.usr_name}
          </Typography>
        </Toolbar>
        
      </AppBar>
    );
  }
}

export default TopBar;
