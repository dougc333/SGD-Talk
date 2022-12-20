var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var async = require('async');

// Load the Mongoose schema for User, Photo, and SchemaInfo
var User = require('./schema/user.js');
var Photo = require('./schema/photo.js');
var SchemaInfo = require('./schema/schemaInfo.js');


// XXX - Your submission should work without this line. Comment out or delete this line for tests and before submission!
//var cs142models = require('./modelData/photoApp.js').cs142models;

var conn= mongoose.connect('mongodb://localhost/cs142project6', { useNewUrlParser: true, useUnifiedTopology: true });

//var queryAllUsers = User.find({});
//var queryOneUser = User.find({"_id:":id})
//var yo; 
//queryAllUsers.select({}).exec(function(err,info){
//    console.log("info:",JSON.parse(JSON.stringify(info)))
//    
//})

//var q1;
async function run(){
  //console.log("running!!!");
  const doc = await Photo.find({})
  //q1 = await User.find({"_id":'5ec06bab46a9ca3953fa5582'});
  console.log("doc:",doc);

}
run()
//outside scope no work
//console.log("q1:",q1)
