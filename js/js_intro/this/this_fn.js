//functions are objects

const rain=function(){
  this.name="rain"
  console.log("rain fn this===globalThis:",this===globalThis)
}

rain.printThis=function(){
  console.log("rain fn this===globalThis:",this===globalThis)
}
console.log("rain():")
rain()
console.log("rain printThis:")
rain.printThis()

