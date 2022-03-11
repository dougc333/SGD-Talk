
const express = require('express')
const server = express()
const os = require('os')

server.get('/',(req,res)=>{
   res.writeHead(200)
   console.log(os.hostname())
   console.log("remote address:"+req.connection.remoteAddress)
   res.end("this is test"+os.hostname()+" remote address:" + req.connection.remoteAddress)
})

server.listen(8080,()=>{
  console.log("server listening on port 8080")
})


