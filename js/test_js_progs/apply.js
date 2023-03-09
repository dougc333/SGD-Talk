//1 method for 2 objects, 




obj = {value:1};
another_obj={value:"were"}; //very useful type coercion! no error! converts to str automatically

add = function(...arr){
    sum=0
    for (let i=0;i<arr.length;i++){
        sum = sum+arr[i];
    }
    return sum+this.value;
}
//first argument to call is obj. Rest are args. 
//call adds function add to teh object. 
let t = (add.call(obj, 10));
console.log(t);

//apply expects an array vs list of args. 

arr=[1,2,3]
console.log("apply test")
console.log(add.apply(obj,arr));
console.log(add.apply(another_obj,arr));
//apply same w/spread operator, dont save much code. 
