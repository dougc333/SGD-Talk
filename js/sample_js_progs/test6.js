
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


// Load the Mongoose schema for User, Photo, and SchemaInfo
var User = require('./schema/user.js');
var Photo = require('./schema/photo.js');
var SchemaInfo = require('./schema/schemaInfo.js');


// XXX - Your submission should work without this line. Comment out or delete this line for tests and before submission!
//var cs142models = require('./modelData/photoApp.js').cs142models;

var conn= mongoose.connect('mongodb://localhost/cs142project6', { useNewUrlParser: true, useUnifiedTopology: true });

var async = require('async')
let arr=[1,2,3]

var result=[]

userListTest=[
  '5ec06bab46a9ca3953fa5581',
  '5ec06bab46a9ca3953fa5582',
  '5ec06bab46a9ca3953fa5583',
  '5ec06bab46a9ca3953fa5584',
  '5ec06bab46a9ca3953fa5585',
  '5ec06bab46a9ca3953fa5586',
]

var photoList=[]

userList = []
//create user_id, first_name, last_name object
function makeUserList(callback){
  User.find({}).exec(function(err,info){
    let usrObj = {}
    //console.log("info:",info)
    for (let i=0;i<info.length;i++){
      usrObj={
        "id:":info._id,
        "first_name":info.first_name,
        "last_name":info.last_name
      }
      //callback(null)
      userList.push(usrObj)
      console.log("userList.len",userList.length)
    }
    console.log("userList length:",userList.length)
    callback(null,userList.length)
  })
  
}
//makeUserList()
function foo(callback){
   //if(err){
   //  console.log("foo error",err)
   //  return
   //}
   //console.log("foo results:",results)
   callback(null)
}

async.series([makeUserList,foo],function(err,results){
  if(err){
    console.log(err)
    return
  }
  console.log("done results:",userList.length)
})

async.each(userListTest,function(x,callback){
  console.log("each x:",x)
  Photo.find({'user_id':x}).exec(function(err,info){
    if(err){
      //send back error
    }
    console.log("info.length:",info.length)
    //info.map(x=>
    //  console.log(x)
    //)
    photoList.push(info)
    callback(null)
  })
},function(err){
  if(err){
    console.log("err")
  }
  //console.log("done photoList",photoList.length)
  console.log('done:',photoList)
})




