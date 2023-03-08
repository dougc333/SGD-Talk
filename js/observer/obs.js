//
 
class Depend{
    constructor(){
        this.subscribers = []
    }

    depend(){
        if (target && !this.subscribers.includes(target)){
            this.subscribers.push(target)
        }
    }

    notify(){
        this.subscribers.forEach(x=>x())
    }
}

const dep = new Depend()
let price = 5
let quantity = 2
let total = 0

let target = ()=>{
    total = price * quantity
}

dep.depend()
target()

console.log(`total is ${total}`)

console.log('changing price from ${price} to 10')
price = 10
dep.notify()
console.log(`total is ${total}`)


