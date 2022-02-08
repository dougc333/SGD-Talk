

class Dog{
    name=Dog
}

function Cat(){
    this.name="Cat"
}

let arrowfn=()=>{}


d=new Dog()
c=new Cat()
console.log("typeof(doggie):",typeof(d))
console.log("typeof(d.constructor):",typeof(d.constructor))
console.log("Dog.prototype:",Dog.prototype) //prtotype only exists at class or Function level

console.log("typeof(kitty_cat):",typeof(c))
console.log("typeof(kitty_cat.constructor):",typeof(c.constructor))
console.log("Cat.prototype:",Cat.prototype)

console.log("arrow fn prototype:",arrowfn.prototype)

class Terrier extends Dog{
    constructor(){
        super()
        this.species="Terrier"
    }
}
//function PersianCat extends Cat{

//}

let terrier = new Terrier()
