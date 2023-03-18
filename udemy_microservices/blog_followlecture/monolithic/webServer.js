const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('hello world')
})



app.listen(4000,()=>{
    console.log('server is running on port 4000')
})