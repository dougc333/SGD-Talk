//function overloading 
//multiple signatures for ts different than JS


interface Coordinate{
  x: number;
  y: number;
}


function parseCoordinateFromNumber(x:number, y:number):Coordinate{
  return {x:x,y:y}
}

function parseCoordinateFromString(x:string, y:string):Coordinate{
    return {x:parseInt(x),y:parseInt(y)}
}
  
function parseCoordinateFromObject(obj:Coordinate):Coordinate{
  return {x:obj.x,y:obj.y}
}


//function overloading, we define the generic function the last one redlines as an error. ignore it. 
function parseCoordinate(obj:Coordinate):Coordinate;
function parseCoordinate(x:number, y:number):Coordinate
function parseCoordinate(x:string, y:string):Coordinate

//question mark on arg2 means optional 
function parseCoordinate(arg1:unknown, arg2?:unknown):Coordinate{
  let coord:Coordinate = {
    x:0,
    y:0
  }
   if (typeof(arg1)==='object'){
    coord.x = (arg1 as Coordinate).x, 
    coord.y = (arg1 as Coordinate).y
   }else if (typeof(arg1)==='string'){
     coord.x = parseInt(arg1),
     coord.y = parseInt(arg2 as string)
   }else if (typeof(arg1)==='number'){
     coord.x = arg1,
     coord.y = arg2 as number
   }

  return coord
}


console.log('parseCoordinate object: ',(parseCoordinate({x:100,y:100})))

console.log("parseCoordinate number: ", (parseCoordinate(10,10)))
console.log("parseCoordinate string: ", (parseCoordinate("5","5")))
