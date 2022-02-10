//all functions inherit from Function.prototype
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions


//function as objects
function dog(name){
    this.name=name
    //tihs bark() isnt reachable, this is a nested function
    function bark(){
        console.log("woof wooof")
    }

}

const my_dog=new dog("fido")
console.log("my_dog:",my_dog," name:",my_dog.name)
dog.prototype.bark=function(){
    console.log("bark bark bark")
}
//you can print out the object field hair but this data field doesnt appear in the dog instances cause it is higher up
//in the inheritance chain.  
dog.prototype.hair="white"
my_dog.bark()
my_dog.is_hungry=false
console.log("my_dog:",my_dog,my_dog.hair)
const another_dog=new dog("max")
console.log("dog max:",another_dog,another_dog.hair)
//hidden cant use __proto__ or prototype
console.log(Object.getPrototypeOf(my_dog))


