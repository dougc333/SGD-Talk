"use strict";

/* jshint node: true */

/*
 * This builds on the webServer of previous projects in that it exports the current
 * directory via webserver listing on a hard code (see portno below) port. It also
 * establishes a connection to the MongoDB named 'cs142project6'.
 *
 * To start the webserver run the command:
 *    node webServer.js
 *
 * Note that anyone able to connect to localhost:portNo will be able to fetch any file accessible
 * to the current user in the current directory or any of its children.
 *
 * This webServer exports the following URLs:
 * /              -  Returns a text status message.  Good for testing web server running.
 * /test          - (Same as /test/info)
 * /test/info     -  Returns the SchemaInfo object from the database (JSON format).  Good
 *                   for testing database connectivity.
 * /test/counts   -  Returns the population counts of the cs142 collections in the database.
 *                   Format is a JSON object with properties being the collection name and
 *                   the values being the counts.
 *
 * The following URLs need to be changed to fetch there reply values from the database.
 * /user/list     -  Returns an array containing all the User objects from the database.
 *                   (JSON format)
 * /user/:id      -  Returns the User object with the _id of id. (JSON format).
 * /photosOfUser/:id' - Returns an array with all the photos of the User (id). Each photo
 *                      should have all the Comments on the Photo (JSON format)
 *
 */

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var async = require('async');

// Load the Mongoose schema for User, Photo, and SchemaInfo
var User = require('./schema/user.js');
var Photo = require('./schema/photo.js');
var SchemaInfo = require('./schema/schemaInfo.js');

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

/*
 * Use express to handle argument passing in the URL.  This .get will cause express
 * To accept URLs with /test/<something> and return the something in request.params.p1
 * If implement the get as follows:
 * /test or /test/info - Return the SchemaInfo object of the database in JSON format. This
 *                       is good for testing connectivity with  MongoDB.
 * /test/counts - Return an object with the counts of the different collections in JSON format
 */
app.get('/test/:p1', function (request, response) {
    // Express parses the ":p1" from the URL and returns it in the request.params objects.
    console.log('/test called with param1 = ', request.params.p1);

    var param = request.params.p1 || 'info';

    if (param === 'info') {
        // Fetch the SchemaInfo. There should only one of them. The query of {} will match it.
        SchemaInfo.find({}, function (err, info) {
            if (err) {
                // Query returned an error.  We pass it back to the browser with an Internal Service
                // Error (500) error code.
                console.error('Doing /user/info error:', err);
                response.status(500).send(JSON.stringify(err));
                return;
            }
            if (info.length === 0) {
                // Query didn't return an error but didn't find the SchemaInfo object - This
                // is also an internal error return.
                response.status(500).send('Missing SchemaInfo');
                return;
            }

            // We got the object - return it in JSON format.
            console.log('SchemaInfo', info[0]);
            response.end(JSON.stringify(info[0]));
            
        });
    } else if (param === 'counts') {
        // In order to return the counts of all the collections we need to do an async
        // call to each collections. That is tricky to do so we use the async package
        // do the work.  We put the collections into array and use async.each to
        // do each .count() query.
        var collections = [
            {name: 'user', collection: User},
            {name: 'photo', collection: Photo},
            {name: 'schemaInfo', collection: SchemaInfo}
        ];
        async.each(collections, function (col, done_callback) {
            col.collection.countDocuments({}, function (err, count) {
                col.count = count;
                done_callback(err);
            });
        }, function (err) {
            if (err) {
                response.status(500).send(JSON.stringify(err));
            } else {
                var obj = {};
                for (var i = 0; i < collections.length; i++) {
                    obj[collections[i].name] = collections[i].count;
                }
                response.end(JSON.stringify(obj));
            }
        });
    } else {
        // If we know understand the parameter we return a (Bad Parameter) (400) status.
        response.status(400).send('Bad param ' + param);
    }
});
app.post('/admin/login',function(request,response){
  //looking for username/password in database, if there set session 
  console.log('In /admin/login login_name:',request.body.login_name)
  console.log("In /admin/login webServer app.post do database access, request.body:",request.body)
  if(request.body!==undefined){
    let login_name = request.body.login_name
    let password = request.body.password
    console.log("first_name:",login_name, "password:",password)
    User.findOne({'login_name':login_name},function(err,info){
      if(err){
        console.log("error from mongodb 500")
        response.status(400).send(JSON.stringify(err));
        return;
      }
      console.log("/admin/login info:",info)
      //if(info.password!==password){
      //  console.log("/admin/login password NOT SAME!!!!!")
      //  console.log("/admin/login password NOT SAME!!!!! sending 400") 
      //  response.status(400).send(JSON.stringify(err));
      //  return;
     // }
      if(info===null || password==undefined){
        console.log("returning 401 UserNotFOundinfo null!!!")
        response.status(400).send("User not found");
        return
      }
      if(info.password===password){
        console.log("/admin/login password confirmed!!!! sending back 200, login_name:",request.body.login_name)
        let cleanMe = JSON.parse(JSON.stringify(info))
        //console.log("cleanMe:",cleanMe)
        request.session.userId=cleanMe._id
        request.session.first_name=cleanMe.first_name
        request.session.last_name=cleanMe.last_name
        request.session.login_name=cleanMe.login_name
        response.status(200).send(cleanMe);
      }else{
        console.log("admin/login passwords dont match returning 400 login_name:",request.body.login_name)
        response.status(400).send("Password not match");
      }

    })
  }
});

app.post('/user',function(request,response){
  console.log("In /user")
  if (request.session.login_name===undefined){
    console.log("undefined /user request.session:",request.session)
    response.status(401).send('User not logged in');
    return
  }else{
    console.log(" not undefined /user request.session:",request.session) 
    console.log(" /user request.session.login_name:",request.session.login_name)   
  }
  console.log("/user response.body:",request.body)
  //create new user
  let newUser={
    'login_name':request.body.login_name, 
    'password':request.body.password, 
    'first_name':request.body.first_name, 
    'last_name':request.body.last_name, 
    'location':request.body.location, 
    'description':request.body.description, 
    'occupation':request.body.occupation
  }

  User.find({login_name:newUser.login_name},function(err,info){
    if(info.length!==0){
      console.log("user already exist!!!! send back 400!!!")
      console.log("info!==null:",info,info.length)
      response.status(400).send('User already exists!!!');
      return
    }
    //add new user to User
    User.create(newUser,function(err,info){
      if(err){
        console.log("error creating new user")
        response.status(400).send('error creatring new user');
        return
      }
      console.log("user created!!!! info:", info)
      response.status(200).send(info);
    })
  })

})

app.post('/photos/new',function(request,response){
  console.log('In /photos/new')
  if (request.session.login_name===undefined){
    console.log("undefined /photos/new request.session:",request.session)
    response.status(401).send('User not logged in');
    return
  }else{
    console.log(" not undefined /photos/new request.session:",request.session) 
    console.log(" /photos/new request.session.login_name:",request.session.login_name)   
  }
  processFormBody(request, response, function (err) {
    if (err || !request.file) {
      // XXX -  Insert error handling code here.
      console.log("in /photos/new no file")
      response.status(400).send("User not found");
      return;
    }
    console.log()
    // request.file has the following properties of interest
    //      fieldname      - Should be 'uploadedphoto' since that is what we sent
    //      originalname:  - The name of the file the user uploaded
    //      mimetype:      - The mimetype of the image (e.g. 'image/jpeg',  'image/png')
    //      buffer:        - A node Buffer containing the contents of the file
    //      size:          - The size of the file in bytes

    // XXX - Do some validation here.
    // We need to create the file in the directory "images" under an unique name. We make
    // the original file name unique by adding a unique prefix with a timestamp.
    var timestamp = new Date().valueOf();
    var filename = 'U' +  String(timestamp) + request.file.originalname;
    console.log("/photos/new filename:",filename, "timestamp:",timestamp)
    fs.writeFile("./images/" + filename, request.file.buffer, function (err) {
      // XXX - Once you have the file written into your images directory under the name
      // filename you can create the Photo object in the database
      if(err){
        console.log('/photos/new fs.writeFile err:',err)
        response.status(400).send("fs writeFile error");
        return
      }
      console.log(" fs writeFile completed:")
    });

    let photoObj={
      'file_name':filename,
      'user_id':request.session.userId,
      'comments':[]
    }
    console.log("/photos/new createinf photoObj:",photoObj)
    Photo.create(photoObj,function(err,info){
      if(err){
        console.log("/photos/new database create error")
        response.status(400).send('database create photo error');
        return;
      }
      console.log("photo/new response:",info)
      response.status(200).send(info);
    })
});
})

app.post('/commentsOfPhoto/:photoId',function(request,response){
  let pId = request.params.photoId;
  console.log(' In /commentsOfPhoto/:photoId photoID:',request.params.photoId)
  if (request.session.login_name===undefined){
    console.log("undefined /commentsOfPhoto/:photoId request.session:",request.session)
    console.log("/commentsOfPhoto/photoID user not logged in")
    response.status(401).send('User not logged in');
    return
  }else{
    console.log(" not undefined /commentsOfPhoto/:photoId request.session:",request.session) 
    console.log(" /commentsOfPhoto/:photoId request.session.login_name:",request.session.login_name)   
  }
  
  console.log("session userId:",request.session.userId)
  console.log('commentsOfPhoto/photoId',pId)
  //console.log("commentsofPhto request:",request)
  console.log("comment request.body:",request.body)
  console.log("comment TO BE ADDED request.body.comment:",request.body.comment)
  Photo.findOne({'_id':pId},function(err,info){
    if(err){
      console.log("commentsOfPhoto/photoId error 500")
      response.status(400).send(JSON.stringify(err));
      return;
    }
    console.log('commentsOfPhoto info:',info)
    //get comments object 
    let commentArr = info.comments
    //console.log(typeof(commentArr))
    commentArr.map(x=>console.log("/commentsOfPhoto/:photoId comment",x))
    //update comment object, do we need to rebuild the object?
    //findOneAndUpdate, findByIdAndUpdate
    
    info.comments.push(
      {
      'comment':request.body.comment,
      'user_id':request.session.userId
    })
    console.log("info.comments after push:",info.comments)
    info.save(function(err,result){
      if(err){
        console.log("findOne save error",err)
        response.status(400).send(JSON.stringify(err));
        return;
      }
      console.log("info after save:",result)
      response.status(200).send(JSON.stringify(result))
    })
  })
})

app.post('/admin/logout',function(request,response){
  console.log('In /admin/logout')
  console.log("/admin/logout request.session",request.session)
  console.log("/admin/logout session.userId:",request.session.userId)
  if(request.session.userId===undefined){
    console.log('admin/logout user not logged in, session.userId undefined')
    response.status(400).send('User Not LoggedIn');
    return
  }
  console.log("admin/logout not undefined")
  console.log("admin/logout destroy session")
  request.session.destroy();
  console.log("request.session after destroy:",request.session) 
  response.status(200).send('Logged Out');
  
  //add redirect?
  
});



/*
 * URL /user/list - Return all the User object.
 */
app.get('/user/list', function (request, response) {
  console.log(' In /user/list login_name:',request.session.login_name)
  if (request.session.login_name===undefined){
    console.log("undefined /user/list: request.session sending back 401:",request.session)
    response.status(401).send('User not logged in');
    return
  }else{
    console.log(" not undefined /user/list: request.session:",request.session) 
    console.log("request.session.login_name:",request.session.login_name)   
  }
    User.find({},function(err,info)
    {
      if(err){
        response.status(500).send(JSON.stringify(err));
        return;
      }else{
        let userList=[]
        info.map(x=>{
                userList.push({'_id':x._id, 
                                "first_name":x.first_name, 
                                "last_name":x.last_name,
                            });
                })
        response.status(200).send(JSON.stringify(userList));
      }
    });

});

/*
 * URL /user/:id - Return the information for User (id)
 */
app.get('/user/:id', function (request, response) {
    console.log(' In /user/:id')
    if (request.session.login_name===undefined){
      console.log("login name undefined returning 401/user/:id request.session:",request.session, "id",request.params.id)
      response.status(401).send('User not logged in');
      return
    }else{
      console.log(" not undefined /user/:id request.session:",request.session)    
    }
    var id = request.params.id;
    if (id === null || id.length!==24) {
      response.status(400).send('Not found');
      return;
    }

    User.find({'_id':id},function(err,info){
      if(err){
        response.status(500).send(JSON.stringify(err));
        return;
      }else{
        let return_obj={
            '_id':info[0]._id, 
            "first_name":info[0].first_name, 
            "last_name":info[0].last_name,
            "location":info[0].location,
            "description":info[0].description,
            "occupation":info[0].occupation,
        }
        response.status(200).end(JSON.stringify(return_obj));
      }
    });    
});

app.get('/commentsOfUser/:id',function(request, response){
  console.log(' In /commentsOfUser/:id')
  if (request.session.login_name===undefined){
    //console.log("/photos/new: request.session:",request.session)
    response.status(401).send('User not logged in');
    return
  }else{
    console.log(" not undefined /photos/new: request.session:",request.session)    
  }
  var id = request.params.id
  if(id===null || id.length!==24){
    response.status(400).send("Not found")
    return
  }
  
  Photo.find({'user_id':id},function(err,info){
    console.log("user_id:",id)
    let returnObj={numComments:0, numPhotos:0}
    //console.log("info:",info)
    let numPhotos=0;
    let numComments=0;
    if(info!==undefined){
      for (let i=0;i<info.length;i++){
        if(info[i].file_name){
          numPhotos+=1
        }
        if(info[i].comments){
          numComments+=info[i].comments.length
        }
        console.log(numPhotos,numComments)
      }
      returnObj.numComments=numComments
      returnObj.numPhotos=numPhotos
      response.status(200).send(JSON.stringify(returnObj));  
    }
  })

})

app.get('/photosOfUser/:id', function (request, response) {
  console.log('In /photosOfUser/:id')
  if (request.session.login_name===undefined){
    console.log("undefined login name reutrning 401 /photosOfUser/:id:  request.session:",request.session," id:",request.params.id)
    response.status(401).send('User not logged in');
    return
  }else{
    console.log(" not undefined /photosOfUser/:id request.session:",request.session)    
  }
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
        //callback(err)
        return
      }
      var photoInfo = JSON.parse(JSON.stringify(photoInfo))
      console.log("photoInfo:",photoInfo)
      var photoArr=[]
      async.each(photoInfo,function(x,callback){
        console.log("photoInfo async each:",x)
        let commentArr = []
        let photoObj ={
          '_id':x._id,
          'date_time':x.date_time,
          'file_name':x.file_name,
          'user_id':x.user_id,
          'comments':commentArr
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
          photoObj.comments.push(commentObj)
        }).catch("err photo comment async each")
        //callback(10)
      }).catch("err photoinfo async each")
      response.status(200).send(photoArr); 
    })
  })
  //photoArr=[]
  
})//end app.get


/*
 * URL /photosOfUser/:id - Return the Photos for User (id)
 
app.get('/photosOfUser/:id', function (request, response) {
  console.log('In /photosOfUser/:id')
  if (request.session.login_name===undefined){
    console.log("undefined login name reutrning 401 /photosOfUser/:id:  request.session:",request.session," id:",request.params.id)
    response.status(401).send('User not logged in');
    return
  }else{
    console.log(" not undefined /photosOfUser/:id request.session:",request.session)    
  }
    var id = request.params.id;
    console.log("photos param id:",id)
    if (id === null || id.length!==24) {
        console.log('User with _id:' + id + ' not found. sending back 400');
        response.status(400).send('Not found');
        return;
    }
    var user_info=[]
    //console.log("build user data for all users")
    User.find({},function(err,info){
      if(err){
        //console.log("**** USER.find err")
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
          }
          console.log("in iife",user_info.length)
          Photo.find({'user_id':id},function(err,info){
            console.log("user info in photo.find:",user_info)
            var photos=[]
            if(err){
              console.log('PhotoFind err',err)
              response.status(500).send(JSON.stringify(err));
              return;
            }else{
              console.log('Photo find info.len',info.length)  
              for(let i=0;i<info.length;i++){
                //console.log(i,info[i])
                //console.log("len comments:",(info[i].comments.length))
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
                        var user_obj=
                        JSON.parse(JSON.stringify({
                            "_id":user_info[k].user_id,
                            "first_name":user_info[k].first_name,
                            "last_name":user_info[k].last_name
                        }))
                        console.log("user_obj:",user_obj)
                      }
                    }
                    comm.push(
                      JSON.parse(JSON.stringify({
                      "comment":info[i].comments[j].comment,
                      "date_time":info[i].comments[j].date_time,
                      "_id":info[i].comments[j]._id,
                      "user":user_obj
                      }))
                    )
                    console.log("comm:",comm)
                 }
                }
                if (comm!==undefined){
                  console.log("comm not undefined")
                  photos.push(
                    JSON.parse(JSON.stringify({
                    "_id":(info[i]._id),
                    "user_id":info[i].user_id,
                    "file_name":info[i].file_name,
                    "comments":comm,
                    "date_time":info[i].date_time
                    })))
                }else{
                  console.log("comm undefined 0 len array")
                  photos.push(
                    JSON.parse(JSON.stringify( {
                      "_id":(info[i]._id),
                      "user_id":(info[i].user_id),
                      "file_name":info[i].file_name,
                      "comments":[],
                      "date_time":info[i].date_time
                    })))
                }
              console.log("photos:",photos)
              }
            
            if (photos.length>0){
              console.log("/photosOfUser/:id before send, photos:",photos)
              //console.log("typeof",typeof(photos))
              //let t = JSON.parse(JSON.stringify(photos))
              response.status(200).send(photos);
            }
          }
         
      })//end Photo.find()
    })();//end User.find()
  }  
}) 
    
}); 
*/

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});


