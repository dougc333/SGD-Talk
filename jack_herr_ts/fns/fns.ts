//ts dont use module.exports
//use es 
//use default export then import is easier, import is fn name without named import syntax

export function add_nums(a:number, b:number):number {
    return a + b;
}

export function a(a:any,b:any):any{
    return a + b;
}

export function fn_union(a:number|string,b:number|string):void{
   const arr:Array<number|string> = [a,b];
   console.log(arr);
}

export const getData = (url:string):Promise<string> => Promise.resolve(`data from url`);


//multiple args and put into array
export const rest_fn=(a:number, b:number, ...args:string[])=>{
    console.log("before adding parameters into single array:",a,b,args.join(","))
    const arr:Array<number|string> = [a,b,...args]
    console.log('after adding all parameteers into array:',arr.join(","))
    
}

//types are enforced at compile time and not runtime for JS compatability. 
//and for runtime speed. 

export const getName=(user:{first?:string, second?:string})=>{
    console.log("use comma:",user.first,user.second)
}

//not so rigid.
export const getName2=(user:{first:string; second:string})=>{
    console.log("use semicolon:",user.first,user.second)
}
//chaining operator for js compatability
//npx tsc fns-test.ts  to compile to js.
export function chain(user:{first:string,second:string}):string{
    return `${user?.first} ${user?.second}`;
}

//null coalescing if not undefinued
export function nullcoalescing(user:{first:string,second:string}):string{
    return `${user?.first ?? 'first from null coalescing'} ${user?.second ?? "second from null coalescing"}`
}


