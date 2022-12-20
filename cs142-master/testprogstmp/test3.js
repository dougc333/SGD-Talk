var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var async = require('async');

// Load the Mongoose schema for User, Photo, and SchemaInfo
var User = require('./schema/user.js');
var Photo = require('./schema/photo.js');
var SchemaInfo = require('./schema/schemaInfo.js');


mongoose.connect('mongodb://localhost/cs142project6', { useNewUrlParser: true, useUnifiedTopology: true });
var info=[]
User.find({},function(err,info){
  if(err){
    console.log('err')
  }else{
    console.log("user len:",info.length)
    for (let i=0;i<info.length;i++){
      console.log("user:",info[i])
    }
  }

})

Photo.find({},function(err,info){
    if(err){
      console.log('err')
    }else{
      console.log("photo len:",info.length)
      for (let i=0;i<info.length;i++){
        console.log("photo:",info[i])
      }
    }
  
  })

  console.log("###################find 4 KENOBI photos")
  Photo.find({'user_id':'5ec06bab46a9ca3953fa5584'},function(err,info){
    if(err){
      console.log('err')
    }else{
      console.log("kenobi len:",info.length)
      for (let i=0;i<info.length;i++){
        console.log("user KEnobi:",info[i])
      }
    }
  
  })
  