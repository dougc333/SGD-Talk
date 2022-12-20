"use strict"
function MyClass(){

}

MyClass.prototype.myMethod=function(a){
    let f1 = function(){return this;};
    let f2 = ()=>this;
    console.log("f1",f1, typeof(f1));
    console.log("f2",f2, typeof(f2));
    if(a===0) return f1()===f2();
    if(a===1) return f1()===f1();
    if(a===2) return f2()===f2();
    return false;
}
var m = new MyClass();
console.log(m.myMethod(0));
console.log(m.myMethod(1));
console.log(m.myMethod(2));