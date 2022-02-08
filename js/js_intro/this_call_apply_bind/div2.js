//div.js showed how to attach listeners
//how to design a framework to allow subscribe = add listener and 
//publish = notify? 
//this was the genesis of jquery
//
var domElement = function(selector){
    this.selector=selector||null
    this.element=null
    console.log(this)
}
//function object in memory, allocated
console.log(domElement)
//run function, this pointer is global object
domElement()
//we can start adding methods to domElement, This is no different
//than an object literal? 

var dom_OL = {}
//what is the difference between an OL and fn? function object vs. OK
console.log(dom_OL)
//no prototype for OL notation. 
dom_OL.printThis=function(){
    console.log("OL prototype.printTHis:",this)
}

dom_OL.printThis()

dom_newObject=new Object()
dom_newObject.printThis=()=>{
    console.log("dom_newObject printThis:",this)
}
dom_newObject.printThis()

