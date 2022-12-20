

//test async.each
//the behavior of this callback is different
//the first callback gets applied to all of teh array elements
//the second callback only called one time. 
var async = require('async')

let arr=[1,2,3,4,5]

//callback is return statement and only works for next function. can pass the result or error using callback
//most error processing logs the error and reutrn which exit function. 
function do1(x,callback){
  console.log("do1:",x)
  callback(x+2)
}
function do2(x){
  console.log("do2:",x)
  //callback(x)
}

//function done(callback){
//   callback()
//}

async.each(arr,do1,do2)