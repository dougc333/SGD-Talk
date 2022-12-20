class foo{
    constructor(age,fn){
        this.age = age;
        this.callback = fn(10);
        var result = fn();
        //console.log(b+" ");
        this.callback = function(b){
          console.log("ab:",b);
        }
        this.callback();
    }   
}

let f = new foo(200,function(){
    console.log("arguments:",arguments);
});