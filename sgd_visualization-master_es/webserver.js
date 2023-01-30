var express = require("express")

var app = express()

app.use(express.static(__dirname))

const portNumber = 3000

//add a default route
app.get('/', function (request, response) {
    response.send('Simple web server of files from ' + __dirname);
});


var server = app.listen(portNumber, ()=>{
    var port = server.address().port
    console.log("listening at http://localhost:"+port+" serving contents of directory:"+__dirname)
})
