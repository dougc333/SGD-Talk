//before class you could use new with functions
//this doesnt have a constructor; manage teh this pointer in fn
//callbacks work the chain up to the parent and get the data in the parent
//'use strict' d=new Dog() wont work ni strict

//'use strict'


function Dog(name){
  this.name=name
  this.sound="woof woof"
  //note: you cant use the familiar syntax where you add functions in functions
  this.say_hi=function (){
    console.log(this.sound)
  }
  this.get_data=function(cb){
    data="data"
    cb()
  }
}

d=new Dog()
d.say_hi()
function callback(){
   console.log("callback")
   console.log(this.data)
   console.log('callback this:',this)
   console.log("callback this.sound",this.d.sound)
}

d.get_data(callback)

//this isnt bound is it global or still local after code?
console.log("not bound this:",this)
console.log("d function object:",d)
