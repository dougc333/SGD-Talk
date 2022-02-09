
//first is a funcdtion or object? a function
function first(){
    this.a="first a"
}

//using new create an object. f is an object even though first() is a function. 
f=new first()
console.log("f:",f)
first.prototype.something="something here"
//using iife will cause undefined
var g=(function(){})
console.log("g:",g)
//f is an object
console.log("typeof(f)",typeof(f)," typeof(g):",typeof(g),"typeof(first):",typeof(first))


//we can use prototype to inherit from first
