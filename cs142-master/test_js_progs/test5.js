var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var async = require('async');

// Load the Mongoose schema for User, Photo, and SchemaInfo
var User = require('./schema/user.js');
var Photo = require('./schema/photo.js');
var SchemaInfo = require('./schema/schemaInfo.js');

var express = require('express');
var app = express();

// XXX - Your submission should work without this line. Comment out or delete this line for tests and before submission!
//var cs142models = require('./modelData/photoApp.js').cs142models;

var conn= mongoose.connect('mongodb://localhost/cs142project6', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.static(__dirname));


app.get('/', function (request, response) {
    response.send('Simple web server of files from ' + __dirname);
});

function getUsers(userCallback){
  User.find({}).exec((err,info)=>{
    if(err){
      response.status(500).send(JSON.stringify(err));
      return; 
    }else{
      var userInfo=[]
      console.log("getUsers data length",info.length)
      for(let i=0;i<info.length;i++){
        userInfo.push({
          "user_id":info[i]._id,
          "first_name":info[i].first_name, 
          "last_name":info[i].last_name
        })
      }
      console.log("after loop, userInfo.length:",userInfo.length)
      userCallback(null,userInfo)
    }
  })
}

function assemblePhoto(data,callback){
  if(err){
    console.log("assemblePhoto err",err)
  }
  console.log("assemblePhoto data:",data)
  console.log("assemblePhoto callback",callback(null,err))
  return 10
}


function getPhotos(data,photoCallback){
  console.log("getPhotos data length:",data.length)
  console.log(data)
  var photos=[]
  async.each(data,assemblePhoto)
  photoCallback(null,photos)
}


function allDone(error,data){
  if (error){
    console.log("error 2")
    response.status(500).send(JSON.stringify(err));
    return;
   }else{
    console.log("allDone data.length:",data.length)
    response.status(200).send(JSON.stringify(data))
  }
}
app.get('/photosOfUser/:id', function (request, response) {
    var id = request.params.id;
    console.log("photos param id:",id)
    if (id === null || id.length!==24) {
        console.log('User with _id:' + id + ' not found.');
        response.status(400).send('Not found');
        return;
    }
    async.waterfall([getUsers,getPhotos],allDone)
    
});

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});
//id:5ec06bab46a9ca3953fa5586



