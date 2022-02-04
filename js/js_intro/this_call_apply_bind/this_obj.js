//object literals vs classes

//dog is an object not an instance of a class
const dog= {
  name:'fido',
  bark_sound:'woof woof',
  hi:function(){
    console.log("hi this:",this)
    console.log(this.name)
  },
  bark:()=>{
    console.log(this.bark_sound)
  },
}
console.log("dog object:",dog)
dog.hi()
dog.bark()

const foo=dog.hi
console.log("assigning object foo to dog.hi()")
foo()
console.log("foo returns undefined to fix bind foo() to dog")
new_foo=foo.bind(dog)
new_foo()
console.log("end new_foo test")

//this is because foo calls a function which uses this which now refers to the global object


