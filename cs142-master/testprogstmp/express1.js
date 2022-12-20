var express = require('express')

var expressApp=express();

expressApp.get('/',function(request,response){
  response.send("hello")
});

expressApp.listen('3000')