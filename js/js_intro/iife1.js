//iifes are used for namespaces. vars are in iife scope and not in globlal scope
//use the return to expose instance variables and functions\
//https://benalman.com/news/2010/11/immediately-invoked-function-expression/
//'use strict'


var first_iife=(function(){})()
var second_iife=(function(){}())


var animal = (function () {
  //this is funny var is hoisted but iife prevents visibility
  some_name = "bob"; //this is private
  var private_method = function () {
    console.log("this is a private method");
  };
  //below not permitted in strict mode, will run in nonstrict mode this is undefined
  //this.species_name="xx"
  var get_species=function(){
    console.log("get_species this:",this)
    return this.species_name
  }
  var set_species=function(s){
    this.species_name=s
  }

  return {
    //the var name is not reachable
    name: "an animal name",
    get_name: function () {
      //node no this pointer. global object, not a class instance
      console.log("name in function get_name:",this.name);
    },
    set_name:function(n){
      console.log("set_name this:",this)
      this.name=n
    },
    get_species,
    set_species,
  };
}());

//animal hi
console.log("boject not classs, typeof(animal):",typeof animal);
console.log("animal.name:",animal.name) 
console.log("animal.get_name below:")
animal.get_name();
animal.set_name("new name")
console.log("get_name():",animal.get_name()) 
console.log(animal.get_species())
animal.set_species("new species")
console.log(animal.get_species())


