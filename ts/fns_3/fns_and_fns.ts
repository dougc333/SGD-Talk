

export function printToFile(text:string, callback:()=>void):void{
    console.log(text)
    callback()
}


export function arrayMutate(
    numbers:number[], 
    mutate:(v:number)=>number):number[]
{
    return numbers.map(mutate)
}


console.log(arrayMutate([1,2,3],x=>x*2))


//hard to read, use types 

type MutationFunction = (v:number)=>number


export function arrayMutateTypes(numbers:Array<number>, mutate:MutationFunction):number[]{
    return numbers.map(mutate)
}
console.log("should see 12,15,18, using type to replace anonymous funciton")
console.log(arrayMutateTypes([4,5,6],x=>x*3))

//is this really better? 
//requires the user to change focus from anonymous funciton to something else which is used once. Unless this is used multiple times I say no. 


//functions which return functions. JS closure. 
