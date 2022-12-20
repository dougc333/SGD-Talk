'use strict';

function Test(a,b){
  this.a = a;
  this.b = b;
}

Test.prototype.render = function(Date){
  this.date = Date;
  console.log("render date:",Date);
};

Test.prototype.foo =()=>{
  console.log(this.date);
}

var t = new Test();
t.render("1/1/2020");
t.foo();