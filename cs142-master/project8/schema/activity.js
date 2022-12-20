"use strict";

/*
 * Defined the Mongoose Schema and return a Model for a Photo
 */

/* jshint node: true */

var mongoose = require('mongoose');

/*
 * Photo can have comments and we stored them in the Photo object itself using
 * this Schema:
 */
var activitySchema = new mongoose.Schema({
  type:String,
  date_time: {type: Date, default: Date.now},
  user_id: mongoose.Schema.Types.ObjectId,
  file_name:String,
  comment:String,
  first_name:String,
  last_name:String,
})


// the schema is useless so far
// we need to create a model using it
var Activity = mongoose.model('Activity', activitySchema);

// make this available to our photos in our Node applications
module.exports = Activity;