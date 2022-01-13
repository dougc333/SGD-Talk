

const express = require('express')

const port=3000
const app=express()
app.get("/",function(request,response){
   response.status(200).send("hello there")
   
})


server=app.listen(port,function(){
  const port = server.address().port
  console.log("listening at port:",port)
})
