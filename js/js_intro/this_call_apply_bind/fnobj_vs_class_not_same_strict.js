'use strict'

class Dog{}

function Cat(){}
//cant do this in strict
let d=new Dog()
let c=new Cat()
console.log("typeof(doggie):",typeof(d))
console.log("typeof(d.constructor):",d.constructor)
console.log("typeof(kitty_cat):",typeof(c))
console.log("typeof(kitty_cat.constructor):",typeof(c.constructor))
