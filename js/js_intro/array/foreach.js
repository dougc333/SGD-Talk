const arr=[1,2,3,4]


const print=(x)=>{
    console.log(x)
}
//var total = 0 dont need this. Ironic
//bc total is var wo declaration. crappy language
const sum=(x)=>{
  total=+x
}
//arr.map(x=>print(x))

//arr.map(x=>console.log(x))
//for each executes callback once for eact array element
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
//reduce pure can replace foreach


//arr.map(x=>sum(x))
//console.log(total)