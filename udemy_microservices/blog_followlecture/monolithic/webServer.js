const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'/src')))

app.get('/', (req, res) => {
    res.send('hello world')
})

app.post('/', (req, res) => {
    
    console.log(req.body)
})

app.listen(4000,()=>{
    console.log('server is running on port 4000')
})