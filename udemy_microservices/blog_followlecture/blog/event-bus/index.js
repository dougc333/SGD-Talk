const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/events', (req,res)=>{
    const event = req.body;
    axios.post('http://localhost:4000/events', event)
    .then(()=>{
        console.log("localhost:4000 event sent");
    }).catch((err)=>{
        console.log(err);
    })

    axios.post('http://localhost:4001/events', event)
    .then(()=>{
        console.log("localhost:4001 event sent");
    }).catch((err)=>{
        console.log(err);
    })

    axios.post('http://localhost:4002/events', event)
    .then(()=>{
        console.log("localhost:4002 event sent");
    }).catch((err)=>{
        console.log(err);
    });
    
    res.send({status:"OK"})
})

app.listen(4005,()=>{
    console.log("localhost:4005");
})