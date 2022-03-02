

function Person(firstName, lastName, age, gender){
  this.name={"first":firstName, "last":lastName}
  this.sex=gender
  this.age=age
}

let bob = new Person("bob", "smith", 100, "M")
console.log("bob:",bob)
console.log("Object.keys():",Object.keys(bob))
console.log(bob.constructor.prototype)
//these results are difference for node vs. browser where parent object is window
//or body for element
