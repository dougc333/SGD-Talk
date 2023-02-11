const express = require('express')
const {randomBytes}  = require('crypto')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

data = {}

app.get("/posts",(req,res)=>{
    console.log("in get")
    res.send(data)
})

app.post("/posts", (req,res)=>{
    console.log("in post /posts")
    const id = randomBytes(4).toString('hex')
    const {header} = req.body
    data[id] = {id,header}
    res.status(201).send(data[id])

})

app.listen(4002,()=>{
    console.log("test server http://localhost:4002/")
})