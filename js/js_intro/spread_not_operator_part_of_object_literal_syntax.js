
const a = (mode)=>{
  return {
    palette:{
      mode:mode,
      ...(mode==='dark'
      ? {a:1} : {a:2})}
  }
}
console.log(a('dark'))
console.log(a('light'))

const b = (mode)=>{
   return{
     a: {...(console.log("asdf"))}
   }
}
console.log("b",b("hi"))

