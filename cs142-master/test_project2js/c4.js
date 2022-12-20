function filter(a){
    console.log("a:",a);
    return function(f1,callback){
        console.log("second:",a);
    }
}

var f = filter([1,2,3]);
f();



