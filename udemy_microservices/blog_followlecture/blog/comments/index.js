const express = require('express')
const bodyParser = require('body-parser')
const {randomBytes} = require('crypto')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req,res)=>{
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments',(req,res)=>{
    const commentId = randomBytes(4).toString('hex')
    const {content} = req.body
    console.log("id:",id)
    console.log("content before insert:",content)

    const comments = commentsByPostId[req.params.id] || []
    console.log("comments before push:",comments)
    comments.push({id:commentId, content})
    console.log("comments after push:",comments)
    commentsByPostId[req.params.id] = comments
    res.status(201).send(comments)
    console.log("after add commentsByPostId:",commentsByPostId)
})

app.listen(4001,()=>{
    console.log("listening on localhost:4001")
})