let arr=[]

function removeDups(a){
  let my_set = new Set(a);
  return [...my_set];
}

let b = [1,1,2,3,4,5]
let my_test = removeDups(b)
console.log(my_test)


