

//bind attaches a function to an object. attaches to object or to class via prototype?
//bind returns a function

var obj = {a:100};

var addMe=function(x){
    return this.a + x;
}

function get_Proto(obj){
    let proto = obj.constructor.prototype;
    let result = '';
    while(proto){
        result = Object.getPrototypeOf(proto);
    }
    return result;
}

var somefn = addMe.bind(obj,10);
console.log(somefn);
console.log(somefn());
console.log(Object.getPrototypeOf(somefn));
//WHOA node.js root object is {} not window! 
console.log(Object.getPrototypeOf(obj));