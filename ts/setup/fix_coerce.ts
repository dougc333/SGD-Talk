
let loggedIn:boolean = true
let n:string = "bob"

n +=" is here"
console.log(n)


console.log("2 ways to type arrays")

const names:string[] = ["a", "b", "c", "d"]
const another:Array<number> = [1,2,3,4]
console.log(names, another, typeof(names),typeof(another))

console.log("a js array in ts")
const arr = []
arr.push(1)
arr.push("asfd")
console.log("no type checking",arr,typeof(arr))


//objects messed up in JS/TS


const aPerson={
    first: "aperson",
    last: "a lastname"
}

const myPerson:{
    first:string;
    age:number;
} = {
    first:"bob",
    age:10
}


interface tallPerson{
    name:string,
    height:number,
}

//note equal sign for type vs. interface 
type shortPerson = {
    name:string,
    height:number
}