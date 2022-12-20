//()();
 //has to be arrow fn? no.
//return number=>number*n;
//closure, can define arbitrary multiply fn w only 1 arg!!!
function mul(n){   
    return function(number){
        return number*n;
    }
}

let twice = mul(2);
console.log(twice(5));

function add(a){
    return function(b){
        return b+a;
    }
}

let one=add(1);
console.log(one(2));

//practice chaining functions w. multiple arguments. 
function sub(a){
    return function(b){
        return a-b;
    }
}
let subOne = sub(10);
console.log(subOne(4));
