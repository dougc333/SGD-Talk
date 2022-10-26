const express = require('express')

const app=express()

app.get("/", (req,res)=>{
  res.send("hello this is express server")
});


app.listen(8080,()=>{
  console.log("hello)
})
