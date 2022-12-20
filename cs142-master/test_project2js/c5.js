function filter(a){
    if (Array.isArray(a)){
        console.log("is array");
    }else{
        console.log('not array');
    }

    return function(fn){
        var result = fn();
        if (typeof(result)==='boolean'){
            console.log('boolean correct');
        }else{
            console.log('not boolean errror');
        }

    }


}

var f = filter([1,2,3]);
f(function(){
    a=1;
    return a===1;
});

