const express = require('express')
//const bodyParser = require('body-parser')
const parse = require('csv-parse').parse
const fs = require('fs')




const app = express()
app.use(express.static(__dirname))

const PORT=3000
app.get("GET /upload",(req,res)=>{
    console.log("GET") 
    console.log(req)
    console.log("parse out the file name")
    

})

app.post("/upload",(req,res)=>{
    console.log("POST upload")
    fileName = "/Users/dc/test_stuff/d3/simple1/2_TwoNum.csv"
    const data =  fs.readFileSync(fileName)
    parse(data,(err,records)=>{
        if(err){
            console.log("error parsing csv file")
            return res.status(400)
        }
        //json object back to webpage
        return res.json({data:records})
    })
    //these are bytes
    console.log(data)
})





app.listen(PORT,()=>{
  console.log("listening on localhost:3000")

})

