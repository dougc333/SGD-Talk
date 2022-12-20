var async = require('async');


var a = function(){
    setTimeout(function(){console.log("1s later")},1000);
}
console.log("typeof a:",typeof(a))
a();

var b=function promiseTimeout(time){
    return new Promise(function(accept,reject){
        setTimeout(function(){console.log("promisteTimeout")},time)
    });
    
}
console.log('typeof b:',typeof(b),typeof(b(300)))

arr=[1,2,3]
async.each(arr,increase,allDone)

function increase(value,allDone){
    console.log('value:',value)
    return value+2
    //callback(error)
    callback();
    console.log("arr:",arr)
}

function allDone(err){
    if(err){
        console.log(err)
    }
    console.log("allDone")
}