//the behvior of this is different in node vs browser
//in the browser this refers to the global window object. 
//console.log(this)
//window
//in node the global object isnt window. 
//
function a(first,second){
   console.log("this:",this)
   //console.log("argList:",argList)
}
//call sets this reference to 1
a.call(1,2)

//this pointer is not same as call
a(1,2)



//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
//this in function context this depends on how fn is called
var obj = {a:"this is a in fn param"}
var obj1=function(){
  var b=100
}
var a="global a"
function whatThis(){
  console.log("this.a:",this.a)
  console.log("this.b:",this.b)
}
whatThis()
whatThis.call(obj)
whatThis.call(obj1)
whatThis.apply(obj)
whatThis.apply(obj1)

//test function scope this
function f1(){
  console.log("f1 this:",this)
  console.log("f1.this===globalThis",this===globalThis)
}
f1()



