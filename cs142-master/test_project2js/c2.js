function addMe(arr){
    console.log(arr[0]+arr[1]);
}

function c2(arr,callback){
  callback(arr);
}

arr=[0,1,2];
c2(arr,addMe);