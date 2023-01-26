var express = require('express')


app = express()
app.use(express.static(__dirname))

portno=3000

var server = app.listen(portno, ()=>{
    var port = server.address().port
    console.log(" listening at http://localhost:"+portno+ "  serving directory:"+__dirname)
})