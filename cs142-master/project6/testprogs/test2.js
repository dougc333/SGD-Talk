var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var async = require('async');

// Load the Mongoose schema for User, Photo, and SchemaInfo
var User = require('./schema/user.js');
var Photo = require('./schema/photo.js');
var SchemaInfo = require('./schema/schemaInfo.js');


mongoose.connect('mongodb://localhost/cs142project6', { useNewUrlParser: true, useUnifiedTopology: true });

User.find({},function(err,info){
    if(err){
      console.log("err")
    }
    userList=[]
    console.log("User length",info.length)
    info.map(x=>{
            userList.push({'id':x._id, 
                            "first_nane":x.first_name, 
                            "last_name":x.last_name,
                        });
            //console.log("user:",x)  
            })
    console.log("userList",userList)
})

console.log("second-----------------")
User.find({"_id":'5ec06bab46a9ca3953fa5586'},function(err,info){
    if(err){
      console.log("err")
    }
    userList=[]
    console.log("User length",info.length)
    info.map(x=>{
            userList.push({'id':x._id, 
                            "first_nane":x.first_name, 
                            "last_name":x.last_name,
                            "location":x.location,
                            "description":x.description,
                            "occupation":x.occupation,
                        });
            //console.log("user:",x)  
            })
    console.log("userList",userList)
})
