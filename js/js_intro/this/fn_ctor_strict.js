//before class you could use new with functions
//this doesnt have a constructor; manage teh this pointer in fn
//callbacks work the chain up to the parent and get the data in the parent
//'use strict' d=new Dog() wont work ni strict

'use strict'


function Dog(name){
  this.name=name
  this.sound="woof woof"
  //note: you cant use the familiar syntax where you add functions in functions
  this.say_hi=function (){
    console.log(this.sound)
  }
  this.get_data=function(cb){
    let data="data"
    let new_cb = cb.bind(this)
    new_cb()
    //cb()
  }
}

let d=new Dog()
d.say_hi()
function callback(){
   console.log("callback","this===globalThis",this===globalThis,"this===undefined",this===undefined)
   //let new_cb = callback.bind(d)
   //new_cb()
   console.log("after new callback")
   console.log(this.data)
   console.log('callback this:',this)
   console.log("callback this.sound",this.sound)
}

d.get_data(callback)

//this isnt bound is it global or still local after code?
console.log("not bound this:",this)

