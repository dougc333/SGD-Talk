import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter, Route, Switch,Redirect
} from 'react-router-dom';
import {
  Grid, Paper
} from '@material-ui/core';
import './styles/main.css';
import TopBar from './components/topBar/TopBar';
import UserDetail from './components/userDetail/UserDetail';
import UserList from './components/userList/UserList';
import UserPhotos from './components/userPhotos/UserPhotos';
import SinglePhoto from './components/userPhotos/SinglePhoto'
import axios from 'axios'
import LoginRegister from './components/session/loginRegister';


class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      prevLogin:'',
      userId:'',
      current_userId:'',
      current_userName:'', //same as logged in name
      fetchData:'',
      prevProps:props,
      photoInfo:'',
      engage:'',
      logged_in:'',
      isLoggedIn:''
    }
  }

  //login passed to loginRegister component
  setLogin = (c)=>{
    //console.log("photoShare setLogin")
    this.setState({logged_in:c,prevLogin:false,isLoggedIn:true})
  }
  //logout passed to topbar component
  setLogout=(c)=>{
    //console.log("*******photoshare logout, c:",c)
    if(c===undefined){
      this.setState({logged_in:'',isLoggedIn:'',prevLogin:''}) //set back to undefined 
    }
  }

  //passed to topbar for advanced features
  setEngage=(c)=>{
    //console.log("photoshare setEngage:",c)
    this.setState({engage:c})
  }

  //passed to userphotos
  photosMount=(numPhotos)=>{
    //console.log("******PhothoShare photosMount:",numPhotos)
    this.setState({photoInfo:numPhotos})
  }
  //passed to Userlist, click on UserList element executes and returns newUserId 
  set_CurrentUserID = (newUserId) => {
    //console.log("******photoShare set_currentUserID newUserId:",newUserId)
    this.setState({current_userId:newUserId, current_userName:this.getName(newUserId)},function(){
      //console.log("photoshare verify state:",this.state)
    }); 
  }

  //input: userid 
  //output: returns name for given userid 
  getName(uid){
    //console.log("photoShare getName uid:",uid)
    //console.log("****getName entries:",Object.entries(this.state.fetchData))
    for (let i =0;i<Object.entries(this.state.fetchData).length;i++ ){
      //console.log("x:",Object.entries(this.state.fetchData)[i][1]['_id'])
      if(Object.entries(this.state.fetchData)[i][1]['_id']===uid){
        return Object.entries(this.state.fetchData)[i][1]['first_name']+" "+Object.entries(this.state.fetchData)[i][1]['last_name']
      }
    } 
  }

  componentDidMount(){
    //console.log("photoshare ComponentDidMount prevProps:",this.state.prevProps)
    //console.log("photoshare ComponentDidMount this.state:",this.state)
    //console.log("photoshare ComponentDidMount this.props:",this.props)
  }
  
  componentDidUpdate(){
        
    if(this.state.isLoggedIn!==undefined && this.state.prevLogin!==this.state.isLoggedIn){
      //console.log("PHOTOSHARE logged in componentDidUpdate logged_in===undef aAND prevLogin!==isLoggedIn:",this.state.logged_in)
      //console.log("after test PHOTOSHARE scomponentDidUpdate this.state:",this.state)
      //console.log("after test PHOTOSHARE componentDidUpdate this.state.prevProps:",this.state.prevProps)
      
      this.setState({prevProps:this.props,prevLogin:true})
      
      //console.log('photoShare axios get /user/list')
      axios.get('http://localhost:3000/user/list')
    .then((response)=>{
      //console.log("PHOTOSHARE then data",response.data); 
      this.setState({fetchData:response.data}
      ,function(){
      //console.log("PHOTOSHARE compnentDidUpdate after setState this.state.fetchData:",this.state.fetchData);
      //console.log("PHOTOSHARE compnentDidUpdate after setState this.state:",this.state);
      //console.log("PHOTOSHARE this.state.fetchData valid!!!!");
      }
      )
    })
    .catch(error=>console.log(error))
    }
    //this.redirectMe()
    //should reset the state and let react rerender. 
  }
  
  redirectMe(){
    //console.log("PHOTOSHARE redirctME")
    if( this.state.logged_in) {
      //console.log("redirectMe photoshare this.state.logged_in:",this.state.logged_in)
      //console.log("redirectMe photoshare this.state.current_userId:",this.state.current_userId)
      return <div><Redirect to = {`/users/${this.state.current_userId}`} /></div>
    } 
    return <div><Redirect path="/users/:id" to="/login-register" /></div>
  }

  addUserList(){
    if(this.state.isLoggedIn && this.state.logged_in){
     return (
      <div>
      <UserList userIdArr={this.state.fetchData} onNewUserID={this.set_CurrentUserID } isEngage={this.state.engage} isLoggedIn={this.state.isLoggedIn} photoShareLoginState={this.state.logged_in} />
      </div>
     )
    }
  }

  appendPhotos(){
    if(!this.state.engage){
      return (<Route path="/photos/:userId"
      render ={ props => <UserPhotos {...props} userLoginInfo={this.state.logged_in}/> }
      />)
    }else{
      return (<Route path="/photos/:userId/"
        render ={ props => <SinglePhoto  {...props} userLoginInfo={this.state.logged_in}/> }
      />)
    }
  }
  addLoginElement(){
    //console.log("PHOTOSHARE addLoginElement, this.state.logged_in:",this.state.logged_in, "this.state.isLoggedIn:",this.state.isLoggedIn)
    if(!this.state.logged_in ){
      //console.log('PHOTOSHARE adding LOGINREGISTER component!!!')
      return  <div> <LoginRegister loginState = {this.setLogin}/></div>
    }
    
  }
//onLogOut={this.logOut}
//{selectedUserName:this.state.current_userName,selectedUserID:this.state.current_userId}
  render() {
    return (
      <HashRouter>
      <div>
      <div>sdfsdfsd</div>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <TopBar usr_name={this.state.current_userName} 
          photoInfo={this.state.photoInfo} onCheckBox={this.setEngage} 
          loginInfo={this.state.logged_in} onLogOut={this.setLogout} photoStatus={this.photosMount}/>
        </Grid>
        <div className="cs142-main-topbar-buffer"/>
        <Grid item sm={3}>
          <Paper  className="cs142-main-grid-item">
            {this.addUserList()}
            {this.redirectMe()}
          </Paper>
        </Grid>
        <Grid item sm={9}>
          {this.addLoginElement()}
          <Paper className="cs142-main-grid-item">
            <Switch>
              <Route path="/users/:userId"
                render={ props => <UserDetail  {...props} /> }
              />
              {this.appendPhotos()}
              <Route path="/users" component={UserList}  />
            </Switch>
          </Paper>
        </Grid>
      </Grid>
      </div>
    </HashRouter>
    );
  }
}


ReactDOM.render(
  <PhotoShare />,
  document.getElementById('photoshareapp'),
);
