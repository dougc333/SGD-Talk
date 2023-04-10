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

// XXX - Your submission should work without this line. Comment out or delete this line for tests and before submission!
//var cs142models = require('./modelData/photoApp.js').cs142models;

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
 * URL /user/list - Return all the User object.
 */
app.get('/user/list', function (request, response) {
    //need parameters from request? no. none needed. 
    //response.status(200).send(cs142models.userListModel());
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
                //console.log("user:",x)  
                })
        //console.log("userList",userList)
        response.status(200).send(JSON.stringify(userList));
      }
    });

});

/*
 * URL /user/:id - Return the information for User (id)
 */
app.get('/user/:id', function (request, response) {
    var id = request.params.id;
    //console.log("/user/:id",id);

    if (id === null || id.length!==24) {
      //console.log('User with _id:' + id + ' not found.');
      response.status(400).send('Not found');
      return;
    }

    User.find({'_id':id},function(err,info){
      if(err){
        //console.error('Doing /user/list error:', err);
        response.status(500).send(JSON.stringify(err));
        return;
      }else{
        //console.log("info find length should be 1!!",info.length)
        //console.log("info",info)
        let return_obj={
            '_id':info[0]._id, 
            "first_name":info[0].first_name, 
            "last_name":info[0].last_name,
            "location":info[0].location,
            "description":info[0].description,
            "occupation":info[0].occupation,
        }
        //console.log("return_obj:",return_obj)        
        response.status(200).end(JSON.stringify(return_obj));
      }
    });    
});

/*
 * URL /photosOfUser/:id - Return the Photos for User (id)
 */

app.get('/photosOfUser/:id', function (request, response) {
    var id = request.params.id;
    //console.log("photos param id:",id)
    if (id === null || id.length!==24) {
        //console.log('User with _id:' + id + ' not found.');
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
          //console.log("user find info:",info[i])
          user_info.push({
                "user_id":info[i]._id,
                "first_name":info[i].first_name, 
                "last_name":info[i].last_name})
          //console.log("user info length in loop:",user_info.length)
          };
          //console.log("in iife",user_info.length)
        })();
      }
    })
    Photo.find({'user_id':id},function(err,info){
        //console.log("user info in photo.find:",user_info)
        var photos=[]
        if(err){
          //console.log('PhotoFind err',err)
          response.status(500).send(JSON.stringify(err));
          return;
        }else{
          //console.log('Photo find info.len',info.length)  
          for(let i=0;i<info.length;i++){
            //console.log(i,info[i])
            //console.log("len comments:",(info[i].comments.length))
            if(info[i].comments.length>0){
              //console.log("comment i:",i," :",info[i].comments) //comments is array
              var comm=[]
              for(let j=0;j<info[i].comments.length;j++){
                //console.log("comment j:",j," :",info[i].comments[j]) //comment, date_time, _id, user_id
                //find user_id for this user
                //console.log("comment[j] user_id:",info[i].comments[j].user_id)
                for(let k=0;k<user_info.length;k++){
                    //console.log("user_info :",user_info[k].user_id.toString(),info[i].comments[j].user_id.toString() )
                    if(info[i].comments[j].user_id.toString()===user_info[k].user_id.toString()){
                      //console.log("match")
                      var user_obj=
                      JSON.parse(JSON.stringify({
                          "_id":user_info[k].user_id,
                          "first_name":user_info[k].first_name,
                          "last_name":user_info[k].last_name
                      }))
                      //console.log("user_obj:",user_obj)
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
                //console.log("comm:",comm)
              }
            }
            if (comm!==undefined){
              photos.push(
                  JSON.parse(JSON.stringify({
                "_id":(info[i]._id),
                "user_id":info[i].user_id,
                "file_name":info[i].file_name,
                "comments":comm,
                "date_time":info[i].date_time
              }))
              )
            }else{
                photos.push(
                  JSON.parse(JSON.stringify( {
                    "_id":(info[i]._id),
                    "user_id":(info[i].user_id),
                    "file_name":info[i].file_name,
                    "comments":[],
                    "date_time":info[i].date_time
                  }))
                  )
            }
            //console.log("photos:",photos)
          }//end for
          if (photos.length === 0) {
              //console.log('Photos for user with _id:' + id + ' not found.');
              response.status(400).send('Not found');
              return;
          }
          if (photos.length>0){
            //console.log("before send, photos:",photos)
            //console.log("typeof",typeof(photos))
            //let t = JSON.parse(JSON.stringify(photos))
            response.status(200).send(photos);
          }
          
        }
       
    })
    
});


var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});