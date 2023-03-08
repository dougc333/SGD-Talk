


const arr = [1,2,3,4,5,6]


//ironically all Java/C++ programs used to be written like below
//including most python programs. Not everybody used comprehensions   
for (let i=0;i<arr.length;i++){
  if (arr[i] % 2==0){
    console.log(arr[i])
  }
} 
console.log('\n \n')
arr.filter(x=>x%2==0).map(x=>console.log(x))


