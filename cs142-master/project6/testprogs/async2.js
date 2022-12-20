var async = require('async')
var fs = require('fs')

fs.readFile("README",(err,data)=>{
    console.log("data:",data.toString())
})

var c = async function biggerIO(){
    var first = await function(){
        fs.readFile("README",(err,data)=>{
            console.log("in fsreadFile data:",data.toString())
            return data
        })
    }

    console.log('first():',first()) //undefined
}

c();
