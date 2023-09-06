
type ThreeDCoordinate= [x:number, y:number,z:number];

//is ok but a bit awkward have to use array notation for tuples
function add(first:ThreeDCoordinate, second:ThreeDCoordinate){
    return [first[0]+second[0], first[1]+second[1], first[2]+second[2]];
}

console.log(add([0,0,0],[1,1,2]))

class ThreeDPoint{
    x:number; y:number; z:number;
    constructor(x:number, y:number, z:number)
    {
      this.x = x
      this.y = y
      this.z = z
    }
}

function add2Points(first:ThreeDPoint, second:ThreeDPoint){
    return new ThreeDPoint(first.x+second.x, first.y+second.y, first.z+second.z)
}

console.log(JSON.stringify(add2Points(new ThreeDPoint(0,0,0),new ThreeDPoint(2,1,2))))
//this one below is better.
console.log(add2Points(new ThreeDPoint(0,0,0),new ThreeDPoint(2,1,2)))


interface TwoDPoint{
    x:number
    y:number
}

function add2d(first:TwoDPoint, second:TwoDPoint){
    return {x:first.x+second.x, y:first.y+second.y}
}

console.log("interface 2d point add:",add2d({x:0,y:0},{x:3,y:3}))

//implementing useState. the tuple=accessor and setter. A setter takes a string and returns void, a getter takes a 
//string and returns a string.
function setStateReplica(initial:string):[()=>string, (v:string)=>void]{
  let state:string=initial
  return[
    ()=>state,
    (v:string)=>{
        state=v
    }
  ]
}

const [get,set]=setStateReplica("a")
console.log(get())
set("b")
console.log(get())
//so hard to read this
