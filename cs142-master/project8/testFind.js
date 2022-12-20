//dialog imaage test https://codesandbox.io/embed/q3zy4r2np4


var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var async = require('async');

// Load the Mongoose schema for User, Photo, and SchemaInfo
var User = require('./schema/user.js');
var Photo = require('./schema/photo.js');
var SchemaInfo = require('./schema/schemaInfo.js');
var Activity = require('./schema/activity.js');

var express = require('express');
var app = express();
var fs = require("fs");
// XXX - Your submission should work without this line. Comment out or delete this line for tests and before submission!
//var cs142models = require('./modelData/photoApp.js').cs142models;
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
app.use(session({secret: 'secretKey', resave: false, saveUninitialized: false}));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
var processFormBody = multer({storage: multer.memoryStorage()}).single('uploadedphoto');

mongoose.connect('mongodb://localhost/cs142project6', { useNewUrlParser: true, useUnifiedTopology: true });

// We have the express static module (http://expressjs.com/en/starter/static-files.html) do all
// the work for us.
app.use(express.static(__dirname));


app.get('/', function (request, response) {
    response.send('Simple web server of files from ' + __dirname);
});

app.get("/find/",function(request,response){
  //hardcode hte user 
  console.log("getPhoto*********")
  getPhoto()
  console.log("getPhotoAsync*********")  
  getPhotoAsync()
  console.log("getPhotoAsyncRecommended*********")
  getPhotoAsyncRecommend()

})



function getPhoto(){
  var userId='5edf3b4f190ce94153443756'
  var photo = Photo.find({"_id":'5edfe818f231de5c07454d5c'})
  console.log("photo:",photo)
  photo.then(function(doc){
    console.log("doc:",doc)
  })
}

async function getPhotoAsync(){
  var p = await Photo.findOne({"_id":'5edfe818f231de5c07454d5c'})
  try{
    console.log("getPhotoAsync p:",p)
  }catch(err){
    console.log(err.stack)
  }
}

//docs say better stack trace! 
//cant have .exec there if we do subdocument query after. 
async function getPhotoAsyncRecommend(){
  //var p = await (await Photo.findOne({"_id":'5edfe818f231de5c07454d5c'})).exec() cant do this if subdoc query can do a filter
  var p = await Photo.findOne({"_id":'5edfe818f231de5c07454d5c'})
  try{
    console.log("getPhotoAsyncRecommended parent doc p:",p)
    console.log("getPhotoAsyncRecommended subdoc special fn:",p.comments.id("5edfe818f231de5c07454d67"))
    //remove the comment
    p.comments.id("5edfe818f231de5c07454d67").remove()
    p.save(function(err){
      if(err){
        console.log("error p.save")
      }
      console.log("removed")
    })
  //verify in mongo CLI
  }catch(err){
    console.log(err.stack)
  }
}

app.get('/delUserAllComments/:id',function(request,response){
  let user_id = request.params.id
  console.log("/delUserAllComments/:id",user_id)
  deleteUserFromAllComments(user_id,response)
  

})

async function deleteUserFromAllComments(user_id,response){
  let p = await Photo.find({})
  //console.log("async deleteUserFromAllComments:",session.userId)
  try{
    console.log("delUserAllComments p:",p)
    for (let i=0;i<p.length;i++){
      console.log("photo[i]:",p[i])
      console.log("comments:",p[i].comments)
      let matchUserId = p[i].comments.filter(x=>JSON.parse(JSON.stringify(x.user_id))===user_id)
      console.log("delAllComments matchUserId:",matchUserId) 
      for (let j=0;j<matchUserId.length;j++){
        p[i].comments.id(matchUserId[j]._id).remove()
        p[i].save(function(err,info){
        if(err){
          console.log("error p.save")
        }else{
          console.log("removed",info)
        }
     })
    }
  }
  }catch(err){
    console.log(err)
  }
}

app.get('/act/:id',function(request,response){
  let id=request.params.id
  console.log("/act id:",id)
  getActivityAsync(id)
})
// same as desc vs -1 verified. 
async function getActivityAsync(id){
  let res = await Activity.find({user_id:id}).sort({date_time:-1}).limit(5)
  try{
    console.log("res:",res)
  }catch(error){
    console.log("error Activity find:",error)
  }
}




//lesson here have to stringify at teh object level, not after pulling fields out even though print stastements show ok. 
app.get("/photoid/",function(request,response){
    //comment id:5edf3b4f190ce9415344376b
    //photoid: 5edf3b4f190ce94153443761
  //const filter=()
//delete deletes the photoobject not comment
  Photo.findOne({
      '_id':'5edfe818f231de5c07454d58'
    },{
        "comments" : {
            $elemMatch:{
                '_id':'5edfe818f231de5c07454d62'
            } 
        }
    },function(err,info){
      if(err){
        console.log("photo find err:",err)
        return
      }
      console.log("info:",info)
      //comment object
      //the find and delete dont work. 
      //
    })

})
//doesnt work bc in subdocument? 
//there is a "Special" syntax for id that is why. Shit on internet is wrong. 
app.get('/f/',function(request,response){
  Photo.find({"_id":'5edfe818f231de5c07454d58',"comments._id":'5edfe818f231de5c07454d62'},function(err,info){
    if(err){
      console.log("err get f findOne:",err)
      return
    }
    console.log("photo info:",info)
    console.log(info[0].comments) //doesnt work
  })
})


var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});
