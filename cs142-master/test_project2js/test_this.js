

var obj = {oldProp:'this old property'};
obj.aMethod = function(){
    this.newProp = "new property";
    return Object.keys(this);
}

console.log(obj.aMethod());
//[ 'oldProp', 'aMethod', 'newProp' ]
//when you add a method to an object or function in JS the this pointer is bound to the object/function

console.log(Object.keys(obj)); //reference to object
//this reference is only available inside the function or object. 


//careful. outside the functoin this refers to the global object, in this case the node
//environment or browser window. 
console.log(this); //node points to empty object {}
console.log(globalThis);

'use strict';
console.log('is this same after strict?');  //yes
console.log(this); //node points to empty object {}
console.log(globalThis);
