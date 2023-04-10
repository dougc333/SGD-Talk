


let arr = [1,2,3,4,5];
//reduce first arg is teh function applied to each element of array, 0 is the initial value
let sum = arr.reduce(function(a,b){
    return a+b;
},0);

console.log(sum);