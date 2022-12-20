function myObj(){};

myObj.color="green"
myObj.count = function(str){
    return str.length;
}
myObj.get_this = function(){
    //console.log("get_this:",this);
    return this;
}

var myOther = {
    a:"black",
    count:function(str){
        return str.length;
    }
}

console.log("myObj:",myObj);
console.log("++++++++++++++++")
console.log("myObj.count:",myObj.count("asdf"));
console.log("#################")
console.log(myObj);
console.log("$$$$$$$$$$$$$$$$$$")
console.log("is reference different from getthis:",myObj.get_this());
console.log("%%%%%%%%%%%%%%");
console.log(typeof(myObj.get_this));
console.log("^^^^^^^^^^^^^^^");
console.log("myOther:",myOther);
console.log("myOther.count:",myOther.count("hello"));
console.log('--------------');
console.log("test bind and scope");
sepObj = {};
sepObj.color="yellow";
sepObj.get_this = function(){
    return this;
}

var mod = {
    x:42,
    getX:function(){
        return this.x;
    }
}

'use strict';
var unboundGetX = mod.getX;
console.log("not same wo paren:",unboundGetX);
console.log("unboundGetX:",unboundGetX());
console.log("modL",mod);
console.log("mod.getX",mod.getX());
var boundGetX = unboundGetX.bind(mod);
console.log("boundGetX:",boundGetX);
console.log("boundGetX():",boundGetX());

