function add(a,b){
    console.log(a+b);
}

function fn(callback,a,b){
    callback(a,b);
}

fn(add,2,3);