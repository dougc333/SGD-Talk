
//this creates a collection in mongodb. no need to create teh collection in mongodb
//this assumes db cs142project6 already exists in mongodb. 

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var async = require('async');

// Load the Mongoose schema for User, Photo, and SchemaInfo
var User = require('./schema/user.js');
var Photo = require('./schema/photo.js');
var SchemaInfo = require('./schema/schemaInfo.js');

var express = require('express');
var app = express();

var dogSchema = new mongoose.Schema({
    dog_name: String, // 	Name of a file containing the actual photo (in the directory project6/images).
});

// XXX - Your submission should work without this line. Comment out or delete this line for tests and before submission!
//var cs142models = require('./modelData/photoApp.js').cs142models;

var conn= mongoose.connect('mongodb://localhost/cs142project6', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.static(__dirname));


app.get('/', function (request, response) {
    response.send('Simple web server of files from ' + __dirname);
});


var Dog =  mongoose.model('Dog',dogSchema)
 
/** 
Dog.create({"dog_name":"a dog"},function(err,info){
    console.log("create info",info)
})
*/

Dog.findOne({'_id':'5ecd6a95cb9065c26329a93e'},function(err,info){
    console.log(info)
    info.dog_name="a cat"
    console.log("new info:",info)
    info.save(function(err,result){
        if(err){
            console.log("dog save err",err)
        }
        console.log(result)
    })
})

//use findOne to save the document. It wont save an array if you do find(). 
//not documented anywhere and not on the web. 


