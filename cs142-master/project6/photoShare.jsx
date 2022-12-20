import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter, Route, Switch,Redirect
} from 'react-router-dom';
import {
  Grid, Paper
} from '@material-ui/core';
import './styles/main.css';
import fetchModel from './lib/fetchModelData'
import TopBar from './components/topBar/TopBar';
import UserDetail from './components/userDetail/UserDetail';
import UserList from './components/userList/UserList';
import UserPhotos from './components/userPhotos/UserPhotos';
import SinglePhoto from './components/userPhotos/SinglePhoto'
import axios from 'axios'


class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      userId:'',
      current_userId:'',
      current_userName:'',
      fetchData:'',
      prevProps:props,
      photoInfo:'',
      engage:''
    }
  }

//passed to topbar
  setEngage=(c)=>{
    console.log("photoshare setEngage:",c)
    this.setState({engage:c})
  }

  //passed to userphotos
  photosMount=(setPhotos)=>{
    //console.log("******photosMount:",setPhotos)
    this.setState({photoInfo:setPhotos})
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
    axios.get('http://localhost:3000/user/list')
    .then((response)=>{
      //console.log("then data",response.data); 
      this.setState({fetchData:response.data}
      //,function(){
      //console.log("Photoshare compnentDidMount setState:",this.state.fetchData)
      //}
      )
    })
    .catch(error=>console.log(error))
  }
  
  componentDidUpdate(){
    this.redirectMe()
    //should reset the state and let react rerender. 
  }

  redirectMe(){
    if( this.state.current_userId.length>1) {
      return <div><Redirect to = {`/users/${this.state.current_userId}`} /></div>
    } 
  }

  add(){
    if (this.state.fetchData.length>1){
      //console.log("ADD**** this.state.fetchData:",this.state.fetchData)
      return (
        <div>
      <UserList userIdArr={this.state.fetchData} onNewUserID={this.set_CurrentUserID } isEngage={this.state.engage}/>
      </div>
      )
    }
  }

  appendPhotos(){
    if(!this.state.engage){
      return (<Route path="/photos/:userId"
      render ={ props => <UserPhotos didMount={this.photosMount} {...props} /> }
      />)
    }else{
      return (<Route path="/photos/:userId/"
        render ={ props => <SinglePhoto didMount={this.photosMount} {...props} /> }
      />)
    }
  }

  render() {
    return (
      <HashRouter>
      <div>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <TopBar usrid={this.state.current_userName} photoInfo={this.state.photoInfo} onCheckBox={this.setEngage}/>
        </Grid>
        <div className="cs142-main-topbar-buffer"/>
        <Grid item sm={3}>
          <Paper  className="cs142-main-grid-item">
            {this.add()}
            {this.redirectMe()}
          </Paper>
        </Grid>
        <Grid item sm={9}>
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
