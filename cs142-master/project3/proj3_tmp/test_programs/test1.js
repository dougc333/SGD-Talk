function foo(a,callback){
  this.a = a;
  console.log("foo ctor var:",a);
  callback.call(this,b); //what do?
};

foo.prototype = function(){
    return {
        doStuff:function(a){
          console.log("doStuff a:",a);
        }
    };
}();

var f = new foo(1,function(){
  console.log("b:",b);
  this.doStuff(10);
});