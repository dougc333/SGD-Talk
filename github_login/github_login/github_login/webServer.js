const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const fetch = (...args)=> import('node-fetch').then(({default:fetch})=>fetch(...args))

const CLIENT_ID = '3e12a33f37c6cea82b9b'
const CLIENT_SECRET = '1faf50bc98d45f447d43011c243696ab5b077204'

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/getAccessToken', async function(req, res){
    
    console.log("server: req.query.code:",req.query.code)

    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code
    console.log("params:",params)

    await fetch('https://github.com/login/oauth/access_token'+params,{
        method:"POST",
        headers:{
            "Accept": "application/json"
        }
    }).then(response => {
        console.log("getaccesstoken returning response.json:")
        return response.json();
    }).then(data=>{
        console.log("server getAccessToken data:",data)
        res.json(data);
    })
})

app.get('/getUserData', async (req, res) => {
    console.log("getUserData")
    req.get("Authorization") //getting header different than url parameter Bearer authorization header
    await fetch('https://api.github.com/user',{
        method:"GET",
        headers:{
            "Authorization": req.get("Authorization")
        }
    }).then(response => {
        console.log("getUserData returning response.json")
        return response.json();
    }).then(data=>{
        console.log("server getUserData data:",data)
        res.json(data);
    });

})

app.listen(4000,()=>{
    console.log('listening on 4000')
})