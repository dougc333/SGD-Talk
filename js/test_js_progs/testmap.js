arr=[1,2,3,4,5,6,7];

for (let i=0;i<arr.length;i++){
    arr[i]++;
}
console.log("arr:",arr);
//arrow function
newArr = arr.map((val,ind)=>{console.log(val,ind)})
console.log("newARr:",newArr);




//fiter