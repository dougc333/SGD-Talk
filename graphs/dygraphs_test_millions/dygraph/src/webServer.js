"use strict";
console.log('webServer.js!');


const express = require('express')

const PORT = 3000
const app = express()

app.use(express.static(__dirname))

const server = app.listen(PORT,function(){
    const sp  = server.address().port
    console.log("listening at localhost:"+PORT + "exporting diurectory:"+__dirname)
    
})

