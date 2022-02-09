//generator uses * notation

const { getSystemErrorMap } = require("util")

function * gen(){
    yield "first"
    yield "second"
    yield "third"
}

const g=gen()
console.log(g.next())
console.log(g.next())
console.log(g.next())

//generator is a prelude to defining iterable interfaces and async/await 
function *gen1(){
    console.log("before 1 second delay")
    setTimeout(()=>{console.log("1 second delay done")}, 1000);
    return 1,2 //we are returning an object. .next() is supposed to return a promise
}

const g1 = gen1()
let foo = g1.next()
console.log(typeof(foo),foo)

//generator is ok, async, promise easier to use

async function test_fn(){
    return new Promise(function(resolve,reject){
        console.log("before 2s timeout")
        setTimeout(function(){
            resolve({"count":1})
            console.log('after 2s timeout')
        },2000)
    })
}

let res = test_fn()
console.log("res:",res) //this prints before res is available; have to use callback to get this result
async function getResult(){
  res1 = await test_fn()
  console.log("res1:",res1)
}
getResult()
