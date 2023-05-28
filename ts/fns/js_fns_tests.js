const { getName,chain,nullcoalescing } = require("./fns");


getName({first:"first",second:"second"})


console.log("we want to replicate the undefined behavior of JS")
console.log(chain())

//this makes JS interoperable testing hard. 
console.log("nullcoalescing 2 calls")
console.log(nullcoalescing())
console.log(nullcoalescing({first:"f",second:"s"}))
