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

var catSchema = new mongoose.Schema({
    cat_name: String, // 	Name of a file containing the actual photo (in the directory project6/images).
});

var activitySchema = new mongoose.Schema({
    type:String,
    date_time: {type: Date, default: Date.now},
    user_id: mongoose.Schema.Types.ObjectId,
    file_name:String,
    comment:String,
    first_name:String,
    last_name:String,
})

var Dog =  mongoose.model('Dog',dogSchema)
var Cat =  mongoose.model('Cat',catSchema)
var Activity = mongoose.model('Activity',activitySchema)
// XXX - Your submission should work without this line. Comment out or delete this line for tests and before su$
//var cs142models = require('./modelData/photoApp.js').cs142models;

var conn= mongoose.connect('mongodb://localhost/cs142project6', { useNewUrlParser: true, useUnifiedTopology: true})
app.use(express.static(__dirname));

app.get('/', function (request, response) {
    response.send('Simple web server of files from ' + __dirname);
});


//this should work wo any mods. nodemon testactivity.js
app.get("/d",function(request,response){
    Cat.create({"cat_name":"a cat"},function(err,info){
        console.log("create info",info)
    })
    Activity.create({
        type:"login",
        user_id:'5ee3d4612061c7fce04a5a93'
    },function(err,info){
        console.log("creater actiity:",info)
    })

})

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});
