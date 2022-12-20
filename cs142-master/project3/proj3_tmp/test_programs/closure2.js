//functions are first classs objects so htey can be fn args
//fnargs are higher order functions. fn can return fn, called fn value functions
//closuers to solve these 2 problems, fnargs and return fn in fn. 
//

//upwardfn problem. when lower fn uses vars from outer fn and keep those in scope for lower
//fn when outer fn out of scope. The inner fn at CREATION savevs teh outer fn vars in closuer
//or scope chain. Durning creation fn SAVES scope chain
'use strict'
var x=20;
function foo(){
    let x=10;
    return function bar(){
        console.log(x);
    };
}
//var x=20;
var returnedfunction = foo();
//var x=20;
returnedfunction();
//cant matter where var=20 is placed. 

//downward fn problem

var x =10;
function foo1(){
    console.log(x);
}

(function (funArg){
    var x=20;
    funArg();
})(foo1);


var data = [];
 
for (var k = 0; k < 3; k++) {
  data[k] = function () {
    console.log(k);
  };
}
 
data[0](); // 3, but not 0
data[1](); // 3, but not 1
data[2](); // 3, but not 2

var data = [];
 
for (var k = 0; k < 3; k++) {
  data[k] = (function (x) {
    return function () {
      console.log(x);
    };
  })(k); // pass "k" value
}
 
// now it is correct
data[0](); // 0
data[1](); // 1
data[2](); // 2

for (let k = 0; k < 3; k++) {
    data[k] = function () {
      console.log(k);
    };
  }
  data[0](); // 0
data[1](); // 1
data[2](); // 2