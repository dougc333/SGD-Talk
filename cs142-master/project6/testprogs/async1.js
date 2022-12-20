
var async = require('async');


function foo(x,callback){
    //db access
    callback(null)
}
//import { forEachOf } from "async"
arr=[1,2,3]

//arr.then(a=>(a[1]=a[1]+2)).then(x=>console.log(x))

async function foo(arr){
    
   for(let i=0;i<arr.length;i++){
       console.log(i,arr)
       var res = await function(){
           arr[i]=arr[i]+10
           console.log('in await function: i',i)
       }
       console.log(res())
       console.log('in loop:',arr)
   }
   
}
foo(arr)
console.log("final:",arr)

//async.each(arr,function(x,callback){
//  console.log("x",x)
//  //callback(x)
//},function(err){
//    console.log('error')
//})
    