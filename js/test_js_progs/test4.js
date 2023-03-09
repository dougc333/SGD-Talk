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
function first(callback){
  var allUsers=[]
  User.find({}).select("_id").exec(function(err,info){
    console.log("info:",JSON.parse(JSON.stringify(info)))
    allUsers.push(info)
  })
  callback(allUsers)
  //return allUsers;
}
function second(info){
   console.log("second:",info.length)
}

var q1;
async function run(){
  console.log("num allUsers:",allUsers.length)
  //console.log("running!!!");
  const doc = await User.findOne()
  q1 = await User.find({"_id":'5ec06bab46a9ca3953fa5582'});
  console.log("doc:",doc);
}
//run()
if (q1 !==undefined){
  console.log("q1:",q1)
}

//how to use mongoose.Promise? use exec() then end()
//object
//console.log(typeof(Photo.find({})),Photo.find({}))
//object Promise w/exec()
//console.log(typeof(Photo.find({}).exec()),Photo.find({}).exec())

Photo.find({'_id':'5ec06bab46a9ca3953fa5591'}).exec(function(err,info){
  if(err){
    //end back error
  }
  console.log("numPhotos:",info.length)
  info.map(x=>
    console.log(x)
  )
})
/** 
async.series([function(first){
                console.log("start")
                first()},
              function(second){
                second();
                console.log("end")
              }],function(err,results){
                console.log("results:",results)
              })
*/
async.waterfall(first,second,function(err,results){
  console.log(results)
})


async.series([
  function(callback) {
    console.log('one');
    callback(null, 1);
  },
  function(callback) {
    console.log('two');
    callback(null, 2);
  },
  function(callback) {
    console.log('three');
    callback(null, 3);
  }
],
function(err, results) {
  console.log("results async series:",results);
  // results is now equal to [1, 2, 3]
});

res=[]
 
function foo1(callback) {
  console.log('one');
  callback(null, 4);
  res.push(7)
}


function foo2(callback) {
  console.log('two');
  callback(null, 5);
  res.push(8)
}

function foo3(callback) {
  console.log('three');
  callback(100, 6);
  res.push(9)
}
//should use callback and wait for results to be ready. 
async.series([foo1,foo2,foo3],
function(err, results) {
  console.log("err foo:",err)
  console.log("results async series foo:",results);
  // results is now equal to [1, 2, 3]
});
console.log("res:",res)

