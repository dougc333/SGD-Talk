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
import Activity from './components/activities/Activity';


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
      isLoggedIn:'',
    }
  }

//server call to add login to activities database
  loginActivity(){
    console.log("PHOTOSHARE loginActivity()")
    axios.post('http://localhost:3000/addAct',{type:"login"})
    .then(res=>{
      console.log("PHOTOSHARE loginActivity res:",res)
    })
    .catch(err=>console.log("PHOTOSHARE loginActivity err:",err))
  }

  logoutActivity(){
    console.log("PHOTOSHARE loginActivity()")
    axios.post('http://localhost:3000/addAct',{type:"logout"})
    .then(res=>{
      console.log("PHOTOSHARE logoutActivity res:",res)
    })
    .catch(err=>console.log("PHOTOSHARE logoutActivity err:",err))
  }


  //login passed to loginRegister component
  setLogin = (c)=>{
    console.log("photoShare setLogin c:",c)
    this.loginActivity()
    this.setState({logged_in:c,prevLogin:false,isLoggedIn:true})
  }
  //logout passed to topbar component
  setLogout=(c)=>{
    console.log("*******photoshare logout, c:",c)
    this.logoutActivity()
    if(c===undefined){
      this.setState({logged_in:'',isLoggedIn:'',prevLogin:''}) //set back to undefined 
    }
  }

  

  //passed to userphotos
  photosMount=(numPhotos)=>{
    console.log("******PhothoShare photosMount:",numPhotos)
    this.setState({photoInfo:numPhotos})
  }
  //passed to Userlist, click on UserList element executes and returns newUserId 
  set_CurrentUserID = (newUserId) => {
    console.log("******photoShare set_currentUserID newUserId:",newUserId)
    this.setState({current_userId:newUserId, current_userName:this.getName(newUserId)},function(){
      console.log("photoshare verify state:",this.state)
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
  
  //we need isLoggedIn as a statevar bc. logged_in is undefined
  //prevLogin is past state for isLoggedIn to stop infinite loop in componentDidUpdate
  componentDidUpdate(){
    if(this.state.isLoggedIn!==undefined && this.state.prevLogin!==this.state.isLoggedIn){      
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
  }
  
  redirectMe(){
    //console.log("PHOTOSHARE redirctME")
    if( this.state.logged_in) {
      return <div><Redirect to = {`/users/${this.state.current_userId}`} /></div>
    } 
    return <div><Redirect path="/users/:id" to="/login-register" /></div>
  }

  addUserList(){
    if(this.state.isLoggedIn && this.state.logged_in){
     return (
      <div>
      <UserList userIdArr={this.state.fetchData} onNewUserID={this.set_CurrentUserID }  isLoggedIn={this.state.isLoggedIn} photoShareLoginState={this.state.logged_in} />
      </div>
     )
    }
  }

  appendPhotos(){
    if(!this.state.engage){
      return (<Route path="/photos/:userId"
      render ={ props => <UserPhotos {...props} userLoginInfo={this.state.logged_in} loginName={this.state.current_userName}/> }
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
  render() {
    return (
      <HashRouter>
      <div>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <TopBar usr_name={this.state.current_userName} 
          photoInfo={this.state.photoInfo} 
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
              <Route path='/activities' render={props=><Activity loginInfo={this.state.logged_in} {...props} />} />
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
