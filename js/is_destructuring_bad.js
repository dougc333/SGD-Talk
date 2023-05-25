const values = Array(1000).fill(0).map((_,i)=>i)

console.log(values.slice(0,4)
)

const p1 = {
  name:"a",
  age:100
}

const p2={
  ...p1,
  name:"b"
}

console.log(p1)
console.log(p2)

p1.age=1000
console.log(p1,p2)

console.log(values.reduce( (acc,value)=>{
  acc[value]=value/2
  return acc
 },{}))

console.log( values.reduce((acc,value)=>({
  ...acc,
  [value]:value,
 }),{}))




