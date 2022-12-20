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
var Activity = require('./schema/activity.js')
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


/*
 * URL /admin/login - Login page
 */
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
      //is this correct? shouldnt crash the server
      if(info===null){
        console.log("null password!!!")
        response.status(400).send(JSON.stringify(err));
        return;
      }
      if(info.password!==password){
        console.log("/admin/login password NOT SAME!!!!!")
        console.log("/admin/login password NOT SAME!!!!! sending 400") 
        response.status(400).send(JSON.stringify(err));
        return;
      }
      if(info===null || password==undefined){
        console.log("returning 401 UserNotFOundinfo null!!!")
        response.status(400).send("User not found");
        return
      }
      if(info.password===password){
        console.log("/admin/login password confirmed!!!! sending back 200, login_name:",request.body.login_name)
        let cleanMe = JSON.parse(JSON.stringify(info))
        console.log("cleanMe:",cleanMe, "sending status 200 login success")
        //session variable for server set here!!!!
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
/*
 * URL /user/ called from login page when registreing user
 */
app.post('/user',function(request,response){
  console.log("In /user creating new user!!!")
  //not logged in no user login check!!! 
  //if (request.session.login_name===undefined){
  //  console.log("undefined /user request.session:",request.session)
  //  response.status(401).send('User not logged in');
  //  return
  //}else{
  //  console.log(" not undefined /user request.session:",request.session) 
  //  console.log(" /user request.session.login_name:",request.session.login_name)   
 // }
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

/*
 * URL /photos/new - Called from Topbar.jsx when adding photo
 */
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
      //recreate the object to send back
      let returnObj={
        id:info._id,
        file_name:filename,
        user_id:request.session.userId,
        first_name:request.session.first_name,
        last_name:request.session.last_name  
      }
      console.log("photo/new response:",returnObj)
      response.status(200).send(info);
    })
});
})

/*
 * URL /commentsOfPhoto/:photoID - adds comment to comment array in Photo Object in Photos collection in mongo cs142project db 
 */
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
/*
 * URL /admin/logout - Call on logout from topbar button. Logout displayed in page
 */
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
    console.log("app.get(/user:id) id:",id, " typeof(id):",typeof(id))
    if (id === null || id.length!==24) {
      response.status(400).send('Not found');
      return;
    }

    User.find({'_id':id},function(err,info){
      console.log("User.find _id:id",id)
      console.log("this is ripley so we khow it is in the DB!!!! ")
      if(err){
        console.log("error: User find id:",id," err:",err)
        response.status(400).send("mongodb user.find err");
        return;
      }
      //why is this length 0!!!!
      if(info.length===0){
        console.log("info.length===0",info.length)
        response.status(400).send("User find null:",id);
        return;
      }
      console.log("app.get(/user/:id) info:",info,"id:",id)
      let return_obj={
        '_id':info[0]._id, 
        "first_name":info[0].first_name, 
        "last_name":info[0].last_name,
        "location":info[0].location,
        "description":info[0].description,
        "occupation":info[0].occupation,
      }
      console.log("/user/:id return_obj",return_obj)
      console.log("user/id sending back 200")
      response.status(200).end(JSON.stringify(return_obj));
    }); //end User find()    
});

/*
 * URL /commentsOfUser/:id - Returns comments for user_id.
 * input: userid, output: numComments, numPhotos per user. Originally for EC 
 */
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

/*
 * URL /photosOfUser/:id - Fixed after project7. Returns comment formatted array in photo db to be comments, first_name, last_name 
 */
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
    //console.log("userInfo:",userInfo)
    Photo.find({'user_id':id},function(err,photoInfo){
      if(err){
        console.log("User find err:",err)
        response.status(400).send('User find error');
        //callback(err)
        return
      }
      var photoInfo = JSON.parse(JSON.stringify(photoInfo))
      //console.log("photoInfo:",photoInfo)
      var photoArr=[]
      async.each(photoInfo,function(x,callback){
        //console.log("photoInfo async each:",x)
        let commentArr = []
        let photoObj ={
          '_id':x._id,
          'date_time':x.date_time,
          'file_name':x.file_name,
          'user_id':x.user_id,
          'likes':x.likes,
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

//extension 1
app.get('/mostRecentPhoto/:id',function(request,response){
  console.log('In /mostRecentPhoto/:id')
  if (request.session.login_name===undefined){
    console.log("undefined login name reutrning 401 /deleteComment/:commentId:  request.session:",request.session," id:",request.params.id)
    response.status(401).send('User not logged in');
    return
  }else{
    console.log(" not undefined /mostRecentPhoto/:id request.session:",request.session)    
  }
  var id = request.params.id
  console.log("/mostRecentPhoto/:id id:",id)
  if (id === null || id.length!==24) {
    console.log('/mostRecentPhoto with _id:' + id + ' not found. sending back 400');
    response.status(400).send('Not found');
    return;
  }
  mostRecentPhoto(id,response)
})

//verify is desc what they want? 
async function mostRecentPhoto(id,response){
  var docs = await Photo.find({user_id:id}).sort({'date_time': 'desc'})
  try{
    console.log("docs:",docs)
    //sort by date the latest one is on top
    response.status(200).send({"file_name":docs[0].file_name,"date_time":docs[0].date_time});
  }catch(err){
    console.log("error mostRecentPhoto:",err)
    response.status(300).send("error mostRecentPhoto");
  } 
}

//extension 1
app.get('/mostCommentsPhoto/:id',function(request,response){
  console.log('In /mostCommentsPhoto/:id')
  if (request.session.login_name===undefined){
    console.log("undefined login name reutrning 401 /mostCommentsPhoto/:commentId:  request.session:",request.session," id:",request.params.id)
    response.status(401).send('User not logged in');
    return
  }else{
    console.log(" not undefined /mostCommentsPhoto/:id request.session:",request.session)    
  }
  var id = request.params.id
  console.log("/mostCommentsPhoto/:id id:",id)
  if (id === null || id.length!==24) {
    console.log('/mostCommentsPhoto with _id:' + id + ' not found. sending back 400');
    response.status(400).send('Not found');
    return;
  }
  mostCommentsPhoto(id,response)
})
//extension 1
async function mostCommentsPhoto(id,response){
  console.log("mostCommentsPhoto id:",id)
  var docs = await Photo.find({user_id:id})
  try{
    console.log("docs:",docs)
    console.log('docs.length:',docs.length)
    //find photo with most comments. 
    let lenArr=[]
    docs.map(x=>lenArr.push(x.comments.length))
    console.log("lenArr:",lenArr)
    let maxIndex = lenArr.indexOf(Math.max.apply(Math, lenArr))
    console.log("maxINdex:",maxIndex)
    console.log("file with max num coments:",docs[maxIndex].file_name)
    //sort by date the latest one is on top
    response.status(200).send({"file_name":docs[maxIndex].file_name,"numComments":lenArr[maxIndex]});
  }catch(err){
    console.log("error mostCommentsPhoto:",err)
    response.status(400).send("error mostCommentsPhoto");
  } 
}

//extension 2
//user is session.userId, type is in get request.
app.post('/addAct/',function(request,response){
  console.log("/addAct/ type:",request.body.type)
  if(request.body.type==='login' || request.body.type==='logout' ){
    console.log("addAct login or logout type!!!")
    Activity.create({
      type:request.body.type,
      user_id: request.session.userId,
    },function(err){
      if(err){
        console.log("activity create error:",err)
        response.status(400).send("activity create error");
        return
      }
      console.log("success info")
      response.status(200).send("login/logout activity success created!!");
    })  
  }//end if login || logout

  if(request.body.type==='uploadPhoto'){
  console.log("/addAct uploading photo response.body:",response.body)
    Activity.create({
      type:request.body.type,
      user_id: request.session.userId,
      file_name:request.body.file_name,
    },function(err){
      if(err){
        console.log("activity create error:",err)
        response.status(400).send("activity create error");
        return
      }
      console.log("success uploaddPhoto")
      response.status(200).send("success uploadPhoto");
    })
  }//end uploadPhoto||addComment

  if(request.body.type==='addComment'){
    console.log("/addAct addComment response.body:",response.body)
      Activity.create({
        type:request.body.type,
        user_id: request.session.userId,
        file_name:request.body.file_name,
        first_name:request.session.first_name,
        last_name: request.session.last_name,
      },function(err){
        if(err){
          console.log("activity create error:",err)
          response.status(400).send("activity create error");
          return
        }
        console.log("success addComment")
        response.status(200).send("success addComment");
      })
    }//end addComment

    if(request.body.type==='registerNew'){
      console.log("/addAct registerNew response.body:",response.body)
        Activity.create({
          type:request.body.type,
          user_id:request.body.userId,
        },function(err,info){
          if(err){
            console.log("activity create error:",err)
            response.status(400).send("activity create error");
            return
          }
          console.log("success registerNew info:",info)
          response.status(200).send(info);
        })
      }//end addComment

})

//extension 2
//input: user_id, output, most 5 recent activities for user_id ===id. 
//do we need id? should be from session... ah why the hell not.. easier to understand
app.get('/act/',function(request,response){
  //id doesnt matter only for login user
  let id=request.session.userId
  getActivityAsync(id,response)

})
// same as desc vs -1 verified. 
async function getActivityAsync(id,response){
  let res = await Activity.find({user_id:id}).sort({date_time:-1}).limit(5)
  try{
    console.log("ACTIITY res:",res)
    response.status(200).send(res)
  }catch(error){
    console.log("error Activity find:",error)
  }
}


//extension 5
//delete comment _id === commentId
//input commentId and photoId. 
app.post('/deleteComment/',function(request,response){
  console.log('In /deleteComment/')
  console.log("request.body",request.body)
  if (request.session.login_name===undefined){
    console.log("undefined login name reutrning 401 /deleteComment/:commentId:  request.session:",request.session," id:",request.params.id)
    response.status(401).send('User not logged in');
    return
  }else{
    console.log(" not undefined /deleteComment/:commentId request.session:",request.session)    
  }
  
  let commentId = request.body.comment_id
  let photoId = request.body.photo_id
  console.log("commentId:",commentId, " photoId:",photoId)
  
  Photo.findById(photoId,function(err,info){
    if(err){
      console.log("comments delete photo not found:",err)
      response.status(400).send('comments delete photo not found:');
      return
    }
    //check userId comment
    console.log("delete comment Photo findById:",info)
    //find comment and check for owner first, res is index of comment in array.
    let res = info.comments.map(function(x){return x._id}).indexOf(commentId)
    console.log("res:",res,typeof(res))
    if(res===-1){
      console.log("no match!!!")
    }else{
      console.log("match!!!!")
      console.log("matched comment:",info.comments[res])
      console.log("matched comment info.comments[res].user_id",JSON.parse(JSON.stringify(info)).comments[res].user_id)
      console.log("matched comment response.session.userId",request.session.userId)
      //check owner of comment
      if(JSON.parse(JSON.stringify(info)).comments[res].user_id===request.session.userId){
        console.log("Delete comment userId verified!!!!")
        //p.comments.id("5edfe818f231de5c07454d67").remove()
        info.comments.id(commentId).remove()
        info.save(function(err){
          if(err){
            console.log("comments delete parent object photo did not save")
            response.status(400).send("comments delete parent object photo did not save");
            return
          }
          //should we do another find to make sure it not there? 
          response.status(200).send('deleted');
        })
      }else{
        console.log("matched comment cant delete comments you dont own!!!!")
        response.status(400).send('matched comment cant delete comments you dont own');
        return
      }
      
  
    }
  })//end photofind.
}); //end app.get

//extension 5
//delete photo _id === photoId
app.get('/deletePhoto/:photoId',function(request,response){
  console.log('In /deletePhoto/:id',request.params.photoId)
  if (request.session.login_name===undefined){
    console.log("undefined login name reutrning 401 /deletePhoto/:id:  request.session:",request.session," id:",request.params.id)
    response.status(401).send('User not logged in');
    return
  }else{
    console.log(" not undefined /deletePhoto/:id request.session:",request.session)    
  }

  let photoId = request.params.photoId;
  console.log("photoId:",photoId)
  if (photoId === null || photoId.length!==24) {
    console.log('User with _id:' + photoId + ' not found. sending back 400');
    response.status(400).send('Not found');
    return;
  }
  //we should do a photo find to make sure it is really there!
  //user can only delete the photo they own!!!
  Photo.findById(photoId,function(err,info){
    if (err){
      console.log("Photo.find err")
      response.status(400).send('photo find() error');
      return
    }
    if(info===null){
      console.log("Photo.find null!!!!!")
      response.status(400).send('photo find() null!!!');
      return
    }
    //check userId photo
    console.log("/deletePhoto/id Photo.find(photoid) info:", info)
    if(request.session.userId!==JSON.parse(JSON.stringify(info)).user_id){
      console.log("Photo delete error can only delete photos you are owner of")
      response.status(400).send('photo delete error can only delete photos you are owner of');
      return
    }

    if(info===null){
      console.log("id not in db:",photoId)
      response.status(400).send('id'+photoId+'not in db');
      return
    }
    //ok to do delete
    Photo.deleteOne({ _id: photoId }, function (err,info) {
      if (err){ 
        response.status(400).send('Photo deleteOne error');
        return
      }
      // deleted at most one document
      console.log("$$$$$$$$$$deletePhoto deleteOne info:",info)
      response.status(200).send(info);
    });
  })
});

//extension 5
//delete User _id === userId
app.get('/deleteUser/:id',function(request,response){
  console.log('In /deleteUser/:id')
  if (request.session.login_name===undefined){
    console.log("undefined login name reutrning 401 /deleteUser/:id:  request.session:",request.session," id:",request.params.id)
    response.status(401).send('User not logged in');
    return
  }else{
    console.log(" not undefined /deletePhoto/:id request.session:",request.session)    
  }
  let userId = request.params.id
  if(userId!== request.session.userId){
    console.log('UserId must match current logged in user!!')
    response.status(401).send('UserId must match current logged in user!!');
    return
  }
  
  console.log("/deleteUser/:id id:",request.params.id)
  if (userId === null || userId.length!==24) {
    console.log('User with _id:' + userId + ' null or not 24 chars long. sending back 400');
    response.status(400).send('Not found');
    return;
  }
  //delete comments belonging to user. under photos db. delete comments first.
  deleteUserFromAllComments(userId,response)
});

//extension 6
app.get('/likes/:id',function(request,response){
  console.log("/like:id")
  if (request.session.login_name===undefined){
    console.log("undefined login name reutrning 401 /deleteUser/:id:  request.session:",request.session," id:",request.params.id)
    response.status(401).send('User not logged in');
    return
  }else{
    console.log(" not undefined /deletePhoto/:id request.session:",request.session)    
  }  

  let photoId = request.params.id
  console.log("/like:id photoId:",photoId)
  Photo.findById(photoId,function(err,info){
    if(err){
      console.log("Photo.findById error:",err)
      response.status(400).send('Photo.findById error');
      return 
    }
    console.log("likes Photo.findById  info:",info)
    //examine if like is there or not if not add it!. 
    let res = info.likes.filter(x=>JSON.parse(JSON.stringify(x.user_id))===request.session.userId)
    console.log("result from filter res should be 0!!!!!!:",res)
    if (res.length===0){
      console.log("res null!! add like to array!!")
      info.likes.push({"user_id":request.session.userId})
      info.save(function(err,result){
        if(err){
          console.log("error p.save")
          response.status(400).send('error p.save(),',err);
          return
        }else{
          console.log("added like",result)
          //delete photos 
        }
      }) //end save
    }
  }) //end Photo.findById
}) //end get

app.get('/Unlike/:id',function(request,response){
  console.log("Unlike/:id")
  if (request.session.login_name===undefined){
    console.log("undefined login name reutrning 401 /deleteUser/:id:  request.session:",request.session," id:",request.params.id)
    response.status(401).send('User not logged in');
    return
  }else{
    console.log(" not undefined /deletePhoto/:id request.session:",request.session)    
  }  

  let photoId = request.params.id
  console.log("/Unlike:id photoId:",photoId)
  Photo.findById(photoId,function(err,info){
    console.log("Unlikes Photo.findById  info:",info)
    //examine if like is there or not if not add it!. 
    let res = info.likes.find(x=>JSON.parse(JSON.stringify(x.user_id))===request.session.userId)
    console.log("result from filter res should be 1!!!!!:",res)
    if(res.length===1){
      console.log("likes res not null, remove")
      info.likes.id(res[0]._id).remove()
      info.save(function(err,result){
        if(err){
          console.log("error p.save")
          response.status(400).send('error p.save(),',err);
          return
        }else{
          console.log("removed like",result)
          //delete photos 
        }
      }) //end save
    }//end if res.length===1
  })//end photo.findById

}) //end get


async function deleteUserFromAllComments(user_id,response){
  let p = await Photo.find({})
  //console.log("async deleteUserFromAllComments:",session.userId)
  try{
    console.log("delUserAllComments list of all photos for user:",p)
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
          response.status(400).send('error p.save(),',err);
          return
        }else{
          console.log("deleteUserFromAllComments all comments removed from all photos!!!!",info)
          //delete photos 
        }
        })//end save
      }//end matchUserId
    }//end p.length
   //comments deleted, delete photots
  }catch(err){
    console.log(err)
  }
  Photo.deleteMany({user_id:user_id},function(err,info){
    console.log("user delete photo.deleteMany")
    if(err){
      console.log("/deleteUser/:userId error:",err)
      response.status(400).send('db Photo.deleteMany error,',err);
      return
    }
    console.log("/deleteUser/:userId delete.many() successful",info)
  })
  User.deleteOne({ _id: user_id }, function (err,info) {
    console.log("user delete User.deleteOne")
    if (err){
      console.log("error User.deleteOne") 
      response.status(400).send('Error User.deleteOne id:',userid);
      return;
    }
    console.log("user delete User.deleteOne successful",info)
    response.status(200).send('success delete user:');
  });
}

async function deletePhotos(id,response){
  let res = Photo.deleteMany({userId: id})
  try{
    console.log("async deletePhotos res:",res)
    response.status(200).send(res)
  }catch(error){
    console.log("error async deletePhotos :",error)
    response.status(400).send("error async deletePhotos :",error)
  }
}

async function deleteUser(id,response){
  let res = await User.deleteOne({ _id: id })
  try{
    console.log("async deleteUser res:",res)
    response.status(200).send(res)
  }catch(error){
    console.log("error async deleteUser :",error)
    response.status(400).send("error async deleteUser:",error)
  }
}
//subdocumnent delete
async function deleteComments(photoId,commentId,response){
  let res = await Photo.findOne({"_id":photoId})
  try{
    console.log("async deleteComments photoFindOne res:",res)
    //check userid of comment before remove NOT ADDED yet!!!
    let resFind = info.comments.map(function(x){return x._id}).indexOf(commentId)
    console.log("res:",res,typeof(res))
    if(resFind!==-1){
      //if(JSON.parse(JSON.stringify(res)).comments[commentId].user_id===request.session.userId){
      //}
    }
    res.comments.user_id(response.session.userId).remove() //this finds it? verify. 
    //this should be another await. 
    let saveRes = await p.save()
    try{
      console.log("saveRes:",saveRes)
      response.status(200).send(saveRes)  
    }catch(err){
      console.log("error p.save")
      response.status(400).send("error async  deleteComments:",error)
    }
  }catch(error){
    console.log("error async deleteComments:",error)
    response.status(400).send("error async  deleteComments:",error)
  }
}

//async function deleteAllUserComments(response){}
//

async function deleteFavorites(id,response){
  let res = await Favorite.deleteMany({user_id: id })
  try{
    console.log("async deleteFavorites res:",res)
    response.status(200).send(res)
  }catch(error){
    console.log("error deleteFavorites deleteMany:",error)
    response.status(400).send("error async deleteFavorites deleteMany:",error)
  }
}

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});


