//only ctor objects have prototype

var a={x:10,y:20};
console.log("a proto is undefined bc only ctor objects have protos:",a.__proto__);

function Cat(name){
    this.name=name;
}
let c = new Cat("sam");
console.log("c proto:",c.__proto__,"c proto:",c.prototype);
var x = function fn(){}
x.prototype.log = function(){
    console.log("1");
}
var b = new x();
b.log();
//console.log(x.prototype);