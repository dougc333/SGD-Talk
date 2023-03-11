const express = require("express")
const https = require('https')
const fs = require('fs')

const app = express()
app.use(express.static(__dirname))



https.createServer({
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
    },app)
    .listen(4000,()=>{
        console.log("https server at port 4000")
    })


app.get('/',(req, res)=>{
    res.send("hello from https server")
})