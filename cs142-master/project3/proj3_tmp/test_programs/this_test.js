//this in ctor
"use strict"
function foo(){
    console.log(this);
}
foo(); //global undefined! not {}
foo.prototype.constructor(); //foo {}
let empty={}
console.log(empty.toString);
console.log(empty.toString()); //vobject, from prototype
console.log(Object.getPrototypeOf({}) ==
            Object.prototype);
// → true 
console.log(Object.getPrototypeOf(Object.prototype)); 
// → null you cant print it!!!
//Array.prototype and Function.Prototype object
let arr=[1,2,3]; 
console.log(Object.getPrototypeOf(arr)==Array.prototype);
console.log(Object.getPrototypeOf(arr)); //[] cant print it!!! shows empty but is really Array.prototype! 

console.log("method in object");


var fooa = {
    bar: function () {
      console.log(this); //bar: Function bar
      console.log(this === fooa); //true
    }
  };
   
  fooa.bar(); // foo, true
   
  var exampleFunc = fooa.bar;
   
  console.log(exampleFunc === fooa.bar); // true
   
  // again with another form of the call expression
  // of the same function, we have different this value
   
  exampleFunc(); //


function A(){
    console.log(this);
    this.x = 10;
}

let a = new A(); //A {} this points to {}, not same as global

A.prototype.foo1 = function(){
    console.log(this); //A {x:10} this points to the object a
}

a.foo1();

function fooe(){
    this.a=10;
    function bar(){
        console.log(this);
    }
    bar();
}
let a1 = new fooe();
//a1.bar(); //fooe { a: 10, bar: [Function] }