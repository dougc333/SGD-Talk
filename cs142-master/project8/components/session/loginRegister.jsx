import React from 'react';
import {
  TextField,Button
} from '@material-ui/core';
import axios from 'axios';


class LoginRegister extends React.Component{
  constructor(props){
    super(props)
    this.state={
      login_name:'',
      login_name2:'',
      password:'',
      password2:'',
      password3:'',
      first_name:'',
      first_name2:'',
      last_name:'',
      last_name2:'',
      location:'',
      description:'',
      occupation:'',  
      userId:'',
      logged_in:'',
      registered:'',
    }
  }

  componentDidMount(){
    console.log("loginRegister componentDidMount")
  }
  componentDidUpdate(){
    //console.log("loginRegister componentDidUpdate this.state",this.state)
  }

  //have to use arrow function in axios.then((response)=> vs. function(response){}
  //or get error cannot-read-property-setstate-of-undefined
  // this.props.loginState(this.state) from parent component. Code for loginState is in photoshare.jsx
  handleSubmit=(e)=>{
    e.preventDefault()
    //console.log("loginRegister handleSubmit e:",e)
    //console.log("loginRegister handleSubmit this.state:",this.state)
    axios.post('http://localhost:3000/admin/login',this.state)
    .then((response)=>{
        //console.log("loginRegister handleSubmit /admin/login response.data:",response.data)
        //console.log("loginRegister handleSubmit userId response.data._id:",response.data._id)
        //console.log("loginRegister handleSubmit first_name response.data.first_name:",response.data.first_name)
        //console.log("loginRegister handleSubmit last_name response.data.last_name:",response.data.last_name)
        this.setState({
          first_name:response.data.first_name,
          last_name:response.data.last_name,
          userId:response.data._id,
          logged_in:true
        })
        //console.log("loginRegister handleSubmit state after setState:",this.state)
        //console.log("loginRegister calling this.props.loginState from photoShare")
        this.props.loginState(this.state)
        })//end then
    .catch(function(err){console.log('loginRegister axios post admin/login error!!!!',err)})
  }

  handleChangeUserName=(e)=>{
    //console.log("loginRegister handleChangeUserName e.target.value",e.target.value)
    this.setState({login_name:e.target.value})
  }
  handleChangeUserName2=(e)=>{
    //console.log("loginRegister handleChangeUserName2 e.target.value",e.target.value)
    this.setState({login_name2:e.target.value})
  }
  handleChangePassword=(e)=>{
    //console.log("loginRegister handleChangePassword e.target.value:",e.target.value)
    this.setState({password:e.target.value})
  }

  handleChangePassword2=(e)=>{
    //console.log("loginRegister handleChangePassword2 e.target.value:",e.target.value)
    this.setState({password2:e.target.value})
  }
  
  handleChangePassword3=(e)=>{
    //console.log("loginRegister handleChangePassword3 e.target.value:",e.target.value)
    this.setState({password3:e.target.value})
  }
  
  handleChangeFirstName2=(e)=>{
    //console.log("loginRegister handleChangeFirstName e.target.value:",e.target.value)
    this.setState({first_name2:e.target.value})
  }

  handleChangeLastName2=(e)=>{
    //console.log("loginRegister handleChangeLastName e.target.value:",e.target.value)
    this.setState({last_name2:e.target.value})
  }

  handleChangeLoc=(e)=>{
    //console.log("loginRegister handleChangeLoc e.target.value:",e.target.value)
    this.setState({location:e.target.value})
  }

  handleChangeDesc=(e)=>{
    //console.log("loginRegister handleChangeDesc e.target.value:",e.target.value)
    this.setState({description:e.target.value})
  }

  handleChangeOccupation=(e)=>{
    //console.log("loginRegister handleChangeOccupation e.target.value:",e.target.value)
    this.setState({occupation:e.target.value})
  }

  handleRegSubmit=(e)=>{
    e.preventDefault()
    //console.log("LoginRegister handleRegSubmit:",e)
    //if(this.state===undefined){
    //  console.log("this.state undefined")
    //}
    //onsole.log("state:",this.state)
    //web server access
    if(this.state.password2!==this.state.password3){
      //alert("passwords must match")
      document.getElementById("msg").innerHTML="passwords must match"
    }

    if(this.state.login_name.length===0){
      //alert("need a value for first_name")
      document.getElementById("msg").innerHTML="login name needs value"
    }
    if(this.state.password2.length===0){
      //alert("need a value for first_name")
      document.getElementById("msg").innerHTML="password needs value"
    }
    if(this.state.password3.length===0){
      //alert("need a value for first_name")
      document.getElementById("msg").innerHTML="password2 needs value"
    }
    if(this.state.first_name2.length===0){
      //alert("need a value for first_name")
      document.getElementById("msg").innerHTML="first name needs value"
    }
    if(this.state.last_name2.length===0){
      //alert("need a value for first_name")
      document.getElementById("msg").innerHTML="last name needs value"
    }
    if(this.state.location.length===0){
      //alert("need a value for first_name")
      document.getElementById("msg").innerHTML="location needs value"
    }
    if(this.state.description.length===0){
      //alert("need a value for first_name")
      document.getElementById("msg").innerHTML="description needs value"
    }
    if(this.state.occupation.length===0){
      //alert("need a value for first_name")
      document.getElementById("msg").innerHTML="occupation needs value"
    }
    let newUser={
      login_name:this.state.login_name2,
      password:this.state.password2,
      first_name:this.state.first_name2,
      last_name:this.state.last_name2,
      location:this.state.location,
      description:this.state.description,
      occupation:this.state.occupation,
    }
    axios.post('http://localhost:3000/user',newUser)
    .then((response)=>{
        console.log("loginRegister newRegUser handleRegSubmit /admin/login response.data:",response.data)
        console.log("loginRegister newRegUser handleSubmit userId response.data._id:",response.data._id)
        console.log("loginRegister newRegUser handleSubmit first_name response.data.first_name:",response.data.first_name)
        console.log("loginRegister newRegUser handleSubmit last_name response.data.last_name:",response.data.last_name)
        this.setState({
          userId:response.data._id,
          registered:true
        },function(){
          console.log("###########LOGINREGISTER setActivity  handleRegSubmit state after setState:",this.state)
          this.setActivity({type:"registerNew",userId:this.state.userId})
        })
        })//end then
    .catch(function(err){
      //console.log('loginRegister axios post new user error!!!!',err)
      document.getElementById('msg').innerHTML="create new user error:"+err
    })
  
  }

  setActivity(newObj){
    console.log("###########LOGINREGISTER setActivity newObj:",newObj)
    axios.post(`http://localhost:3000/addAct/`,newObj)
    .then((response)=>{
      console.log("###########LOGINREGISTER setActivity NewUser registration activuty response:",response)
      console.log("###########LOGINREGISTER setActivity clearing fields for next yser")
      document.getElementById('msg').innerHTML="new user created successfully, clearing input fields"
      this.setState({
        login_name:'',
        login_name2:'',
        password:'',
        password2:'',
        password3:'',
        first_name:'',
        first_name2:'',
        last_name:'',
        last_name2:'',
        location:'',
        description:'',
        occupation:'',  
        userId:'',
        logged_in:'', //we should log in? do a database query and login? 
        registered:true,
      })
    })
    .catch(error=>{
      console.log("New registration activity post error:",error)
    })
  }

  render(){
      return(
        <div>
        <form onSubmit={this.handleSubmit}>
            <div>
            <TextField type="text" name='login_name' placeholder="Malcolm Took" value={this.state.login_name || ''} onChange={this.handleChangeUserName}/>LoginName
            </div>
            <div>
            <TextField type="text" name='password' placeholder="weak" value={this.state.password || ''} onChange={this.handleChangePassword}/> Password
            </div>
         <Button type="submit" value="Submit" >Submit</Button>
        </form >
        <div>  
        <form onSubmit={this.handleRegSubmit}>
          <div>
          <TextField type="text" name="login_name" placeholder="login_name" value={this.state.login_name2 || '' } onChange={this.handleChangeUserName2}/> LoginName
          </div>
          <div>
          <TextField type="text" name="password" placeholder="password" value={this.state.password2 || '' } onChange={this.handleChangePassword2}/> password
          </div>
          <div>
          <TextField type="text" name="password2" placeholder="password2" value={this.state.password3 || '' } onChange={this.handleChangePassword3}/> password again
          </div>
          <div>
          <TextField type="text" name="first_name2" placeholder="first_name" value={this.state.first_name2 || '' } onChange={this.handleChangeFirstName2}/> first_name
          </div>
          <div>
          <TextField type="text" name="last_name2" placeholder="last_name" value={this.state.last_name2 || '' } onChange={this.handleChangeLastName2}/> last_name
          </div>
          <div>
          <TextField type="text" name="location" placeholder="location" value={this.state.location || '' } onChange={this.handleChangeLoc}/> location
          </div>
          <div>
          <TextField type="text" name="description" placeholder="description" value={this.state.description || '' } onChange={this.handleChangeDesc}/> description
          </div>
          <div>
          <TextField type="text" name="occupation" placeholder="occupation" value={this.state.occupation || '' } onChange={this.handleChangeOccupation}/> occupation
          </div>
          <Button type="submit" value="Submit" >Submit</Button>
          <div id="msg"></div>
        </form>
        </div>
        </div>
      )
  }
}

export default LoginRegister