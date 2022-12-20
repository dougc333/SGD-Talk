
//when to use callback? 
function Test(a,callback){ 
  this.a = a;
  //callback() same as callback.call(this)?  yes, callback() executes callback 
  //and callback.call(this) executes the callback function
  callback.call(this);
  //callback();
}

Test.prototype.foo = function(b){
  this.b = b;
  console.log(b);
  
}; //need semicolon for execution. Does it matter to do ()? 

var t = new Test(10,function(){
  console.log("callback function")
});

function getThis(a){
  console.log("fn",a," this:",this);
}
//called in global scope so bound to this in global scope
getThis(10);

var g ={
    show: function(){
        console.log("show this:",this);
    }
}
//g1 = new g();
g.show();

let ourObject = {
    ourMethod: function(){
        console.log(this);
    }
};
ourObject.ourMethod();

function Dog(){
    console.log(this);
}

d = new Dog();


class Cat{
    constructor(){
        console.log(this);
    }
    meow(){
      console.log("meow this:",this)
    }
}
c = new Cat(); // Cat {}
c.meow(); //Cat {}

console.log("--------------");
function higherOrder(callback){
    console.log("this higherOrder:",this);
    callback();
}

function getThis(){
    console.log(this);
};

higherOrder(getThis);

console.log("++++++++++++++++++");
function callbackAsMethod(callback){
    let oddballObject = {
        name:"dont do this"
    };
    oddballObject.callback = callback;
    oddballObject.callback();
}
callbackAsMethod(getThis);

