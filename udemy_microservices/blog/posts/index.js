

const express = require('express')
const {randomBytes} =require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors)

const posts={}

app.get('/posts', (request, response)=>{
    console.log("POST SERVER GET")
    response.send(posts)
})

app.post("/posts",(request, response)=>{
    console.log("post server port 4000 /posts ")
    const id = randomBytes(4).toString('hex')
    const {title} = request.body
    console.log("post server title:",title)
    posts[id] = {id,title}
    response.status(201).send(posts[id])

})

app.listen(4000,()=>{
    console.log("listening on localhost:4000")
})