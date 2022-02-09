//the precursor to an iife is the js parenentisis operator
//it is usually used for precedence. 
'use strict'

const stuff_in_paren=("only expressions decls not permitted in parens")
console.log(stuff_in_paren)
const more_stuff_bad_but_runs=(console.log("bad stuff but runs"))
console.log(more_stuff_bad_but_runs)
console.log("note undefined from second console.log")

//Point 1: precedence vs parenthesis operator
var f = function(){var some="some";console.log("function f")}
//this is now a precedene operator, it isnt the same as putting parenthesis around function(){}. How confusing
(f)

console.log("f:",f) //f is undefined but if put func declaration in parenthesis it is defined
var g = (function(){var some_g="some_G";console.log("function g")})
console.log("g:",g)


//Point2 nested functions. 
const someFn = function(){return("someFn:",Date.now())}
console.log(someFn())
function freeze(time) {
    const stop = new Date().getTime() + time;
    while(new Date().getTime() < stop);
  }
console.log("freeze 3s");
freeze(3)
console.log(someFn())
//someFn() acts like a constructor a new object is called everytime it is called

