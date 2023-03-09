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


var user_info=[]
//console.log("build user data for all users")
User.find({},function(err,info){
  if(err){
      console.log("err")
      response.status(500).send(JSON.stringify(err));
      return;
  }else{
    (()=>{for (let i=0;i<info.length;i++){
        console.log("user find info:",info[i])
        user_info.push({
                        "user_id":info[i]._id,
                        "first_name":info[i].first_name, 
                        "last_name":info[i].last_name})
          //console.log("user info length in loop:",user_info.length)
        };
        console.log("in iife",user_info.length)})();
  }
})
//console.log("user_info length:",user_info.length)
//console.log("after user_info:",user_info)
//console.log("********************")


var p = Photo.find({'user_id':'5ec06bab46a9ca3953fa5584'},function(err,info){
    if(err){
        console.log('err',err)
    }else{
      console.log('num photos should be 4 info.len',info.length)
      var photos=[]
      for(let i=0;i<info.length;i++){
        console.log(i,info[i])
        console.log("len comments:",(info[i].comments.length))
        if(info[i].comments.length>0){
          console.log("comment i:",i," :",info[i].comments) //comments is array
          var comm=[]
          for(let j=0;j<info[i].comments.length;j++){
            console.log("comment j:",j," :",info[i].comments[j]) //comment, date_time, _id, user_id
            //find user_id for this user
            console.log("comment[j] user_id:",info[i].comments[j].user_id)
            for(let k=0;k<user_info.length;k++){
                console.log("user_info :",user_info[k].user_id.toString(),info[i].comments[j].user_id.toString() )
                if(info[i].comments[j].user_id.toString()===user_info[k].user_id.toString()){
                  console.log("match")
                  var user_obj={
                      "_id":user_info[k].user_id,
                      "first_name":user_info[k].first_name,
                      "last_name":user_info[k].last_name
                  }
                  console.log("user_obj:",user_obj)
                }
            }
            comm.push({
                "comment":info[i].comments[j].comment,
                "date_time":info[i].comments[j].date_time,
                "_id":info[i].comments[j]._id,
                "user":user_obj
            })
            console.log("comm:",comm)
          }
        }
        if (comm!==undefined){
          photos.push({
            "_id":info[i]._id,
            "user_id":info[i].user_id,
            "file_name":info[i].file_name,
            "comments":comm,
            "date_time":info[i].date_time
          })
        }else{
            photos.push({
                "_id":info[i]._id,
                "user_id":info[i].user_id,
                "file_name":info[i].file_name,
                "date_time":info[i].date_time
              })
        }
        console.log("photos:",photos)
      }
      return photos
    }
})
console.log("p,length:",p.length)



/** 
    let u= '5ec06bab46a9ca3953fa5583'
    m=[]
    //x.user_id.toString()===u ? console.log("0"):console.log("0")
    let findU1=info.filter(x=> console.log("filter:",x.user_id.toString(),typeof(x.user_id)))
    for (let i=0;i<info.length;i++){
        console.log("testing:",info[i].user_id,typeof(info[i].user_id.toString()),"u:",u)
        //.toString()
        if(info[i].user_id.toString()===u){
            m.push(info[i])
        }
    }
    
    console.log("u len:",findU1.length)
    console.log("m len:",m.length)
   */