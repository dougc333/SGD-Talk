const arr=[1,2,3,4]


const print=(x)=>{
  console.log(x)
}
const sum=(x)=>{
  total=+x
}
console.log("running arr.map(x=>print(x))")
arr.map(x=>print(x))
console.log("end running arr.map(x=>print(x))")
console.log(
  "in the browser this is different than node, you get an [undefined,undefined,undefined,undefined]"
)
console.log("this is not acceptable, use a filter which returns an empty array or functional iterator which returns nothing")






//for each executes callback once for eact array element
console.log("running arr.forEach(x=>print(x))")
arr.forEach(x=>sum(x))
console.log("total",total)

//foreach has x, index
a=['a','b','c']
a.forEach((element,index)=>console.log(element,index))

//impt in data science
sparse=[1,2,,,,7,8,9]
//foreach will skip Over

//for, will not....

//if there is if statement in foreach then it is wrong....



//forerach impure, because it affect outside state
//reduce pure can replace foreach.  reduce keeps track of global state internally, the init constant in example, 
//This makes it a pure fn without dependencies on outside state. 

const arr1 = [1,2,3,4,5]
const init=0
const reducer=(state,value)=>{
    return state+value
}
const total_reducer = arr.reduce(reducer,init)
print(total_reducer)
//arr.map(x=>sum(x))
//console.log(total)