"use strict"


function printThis(){
  console.log(this)
  console.log(this===globalThis)
  console.log(this===void 0)
  console.log(this===undefined)

}

printThis()
