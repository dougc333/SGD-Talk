var i = 1;
console.log(i); //1
function f(){
    i++;
    return i;
}
console.log(f()); //2

(function(){
  var i=1;
  console.log("iife:", i);
  function f(){
      i++;
      return i;
  }
  return f;
})(); //executes function

console.log(i); //2 
