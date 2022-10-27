'use strict';

const {S3} = require('@aws-sdk/client-s3');
const s3 = new S3({regioin:'us-west-2'})


const express = require('express');
const portno = 3000;   // Port number to use

const app = express();
app.use(express.static(__dirname));

app.get('/', function (request, response) {
    response.send('Simple web server of files from ' + __dirname);
});


var server = app.listen(portno, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
  });