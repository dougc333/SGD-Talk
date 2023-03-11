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
let target = null

function watcher(fn){
    target = fn
    dep.depend()
    target()
    target=null
}

watcher(()=>{
    total = price * quantity
})

console.log(`total is:${total}`)
price=20
dep.notify()
console.log(`total is:${total}`)


