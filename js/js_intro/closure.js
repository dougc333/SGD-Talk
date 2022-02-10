//closures lead to module design pattern
//

function first(){
    let some_var=10
    function second(){
        console.log(some_var)
        let store_this=this //this is undefined in browser. inconsistent. 
        console.log(this) //funny doesnt return this of first() bc is is out of scope. defaults to global object
    }

    return second

}

const inner=first()
inner()

//inner function runs even though outer function out of scope. 
//can return inner function and have this run. this