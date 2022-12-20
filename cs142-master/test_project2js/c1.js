function fOne(x){
    console.log("x:",x);
}

function FTwo(var1, callback){
    callback(var1);
}

FTwo(2,fOne);