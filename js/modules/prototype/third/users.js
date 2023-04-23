//not correct, should be in a wrapper or in APP object
APP.users = ['ann','bob','fred','john']

//crappy design.. can access APP.users directly
//this was from the youtube video, dont use this. keep APP.users as is and access directly
const getUsers = () =>{
  return APP.users
}

APP.getUsers = getUsers