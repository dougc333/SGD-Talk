How to fix this? Want to print out 1 second delay done 

function *gen1(){
    console.log("before 1 second delay")
    setTimeout(console.log("1 second delay done"), 1000);
}

const g1 = gen1()
g1.next()

Works but we get an error message: 

dougchang@Dougs-MacBook-Pro:~/test_stuff/js/js_intro$ node tmp.js
before 1 second delay
1 second delay done
node:internal/validators:223
    throw new ERR_INVALID_CALLBACK(callback);
    ^

TypeError [ERR_INVALID_CALLBACK]: Callback must be a function. Received undefined
    at setTimeout (node:timers:141:3)
    at gen1 (/Users/dougchang/test_stuff/js/js_intro/tmp.js:3:5)
    at gen1.next (<anonymous>)
    at Object.<anonymous> (/Users/dougchang/test_stuff/js/js_intro/tmp.js:7:4)
    at Module._compile (node:internal/modules/cjs/loader:1101:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1153:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:17:47 {
  code: 'ERR_INVALID_CALLBACK'
}
dougchang@Dougs-MacBook-Pro:~/test_stuff/js/js_intro$ 