//a simple fix record the statement we want to be reactive. We have to store this 
//and when price changes we re run the stored code




let price = 5
let quantity  = 10
let total = 0
let target = null
let storage = []

//the total quantity is reactive is we store it in storage
target = () => { total = price * quantity }

function record(){ storage.push(target) }
function replay(){ storage.forEach(x=>x()) }

record()
target()
console.log(`total is ${total}`)
console.log('changing price to 20')
price=20
replay()
console.log(`total is ${total}`)


