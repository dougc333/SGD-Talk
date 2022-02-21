
var express = require('express')
var path=require('path')
var app=express()



app.get('/',function(req,res){
  console.log("__dirname:",__dirname)
  res.sendFile(path.join(__dirname,'/index.html'))
})

app.listen(3000,function(){
  //const port = server.address().port
  console.log("listening at http://localhost:3000")
})

