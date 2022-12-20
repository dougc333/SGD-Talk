 //boo boo

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var async = require('async');

// Load the Mongoose schema for User, Photo, and SchemaInfo
var User = require('../schema/user.js');
var Photo = require('../schema/photo.js');
var SchemaInfo = require('../schema/schemaInfo.js');

var express = require('express');
var app = express();

var dogSchema = new mongoose.Schema({
    dog_name: String, //        Name of a file containing the actual photo (in the directory project6/images).
});

// XXX - Your submission should work without this line. Comment out or delete this line for tests and before su$
//var cs142models = require('./modelData/photoApp.js').cs142models;

var conn= mongoose.connect('mongodb://localhost/cs142project6', { useNewUrlParser: true, useUnifiedTopology: true})
app.use(express.static(__dirname));

app.get('/', function (request, response) {
    response.send('Simple web server of files from ' + __dirname);
});
app.get('/foo/:id', function (request, response) {
  console.log('In /photosOfUser/:id')
  var id = request.params.id;
  console.log("photos param id:",id)
})

app.get('/photosOfUser/:id', function (request, response) {
    console.log('In /photosOfUser/:id')
    
    var id = request.params.id;
    console.log("photos param id:",id)
    if (id === null || id.length!==24) {
      console.log('User with _id:' + id + ' not found. sending back 400');
      response.status(400).send('Not found');
      return;
    }
    
    User.find({},function(err,userInfo){
      if(err){
        console.log("User find err:",err)
        response.status(400).send('User find error');
        return
      }
      var userInfo=JSON.parse(JSON.stringify(userInfo))
      console.log("userInfo:",userInfo)
      Photo.find({'user_id':id},function(err,photoInfo){
        if(err){
          console.log("User find err:",err)
          response.status(400).send('User find error');
          return
        }
        var photoArr=[]
        var photoInfo = JSON.parse(JSON.stringify(photoInfo))
        console.log("photoInfo:",photoInfo)
        async.each(photoInfo,function(x,callback){
          console.log("photoInfo async each:",x)
          let commentArr = []
          let photoObj ={
            'id':x._id,
            'file_name':x.file_name,
            'date_time':x.date_time,
            'comment':commentArr
          }
          photoArr.push(photoObj)
          async.each(x.comments,function(y,callback){
            if(err){
              console.log("err",err)
              response.status(400).send('Photo find error');
              return
            }
            console.log("comment:",y.comment)
            console.log("date_time:",y.date_time)
            console.log("user_id:",y.user_id)
            console.log("y._id:",y._id)
            //console.log("x._id",x._id)
            console.log("typeof(y._id):",typeof(y._id))
            console.log("typeof(x._id):",typeof(x._id))
            console.log("len userInfo:",userInfo.length)
            //console.log('userInfo find:',z);
            let res = userInfo.find(z=>z._id===y.user_id)
            console.log("res:",res)
            let userObj={
              '_id':res._id,
              'first_name':res.first_name,
              'last_name':res.last_name,
            }
            let commentObj={
              '_id':y._id,
              'date_time':y.date_time,
              'comment':y.comment,
              'user':userObj,
            }
            photoObj.comment.push(commentObj)
          })
          response.status(200).send(photoArr);        
          //callback(10)
        })
      })
    })
    //var photoArr=[]
    
})//end app.get


var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});
