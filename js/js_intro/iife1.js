//iifes are used for namespaces. vars are in iife scope and not in globlal scope
var animal = (function () {
  //this is funny var is hoisted but iife prevents visibility
  var name = "bob";

  var private_method = function () {
    console.log("this is a private method");
  };

  return {
    hi: function () {
      //node no this pointer. global object, not a class instance
      console.log("name in function hi:",name);
    }
  };
})();

//animal hi
console.log("typeof(animal):",typeof animal);
//console.log("name:",name) error name is not defined
console.log("animal.hi below:")
animal.hi();

