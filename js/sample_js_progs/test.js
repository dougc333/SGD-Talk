console.log(a); //will display 3 bc var is global
var a = 3;
function foo(x){
  console.log(x); //display 20 bc in scope x is defined
  var c = 10; 
  x = 20;
  console.log(a); //3 bc global
  a=4;
  return func;
  function func(d){
    c = d;
    x *=2;
    return {a:a,c:c,x:x};
  }
}
console.log(a); //3
var bar = foo(a);
console.log(a); //4
var retVal = bar(3); //console.log(x) is 3, console.log(a) is 4;
//console.log(retVal.a);
//retVal = bar(3);
//console.log(retVal.a);
//retVal=bar(5);
//console.log(retVal.c);
//console.log(retVal.x)
//console.log(a);



