
class Element{
  constructor(name,x,y){
    this.name=name
    this.start_coord=x
    this.end_coord=y
    this.listeners=[]
  }
  addListener(l){
    this.listeners.push(l)
  }
  removeListener(l){
    //formal api for map
    this.listeners.map(function(element,index,array){
      console.log('element:',element)
      console.log("index:",index)
      console.log('array:',array)
      console.log("this:",this)

    },this)
  }
}

let Div= new Element("div",[0,0],[40,40])
Div.addListener(function first(){console.log("first fn")})
Div.addListener(function second(){console.log("second fn")})
Div.addListener(arrow=()=>{console.log("arrow")})
Div.addListener(()=>{console.log("?? arrow")})

Div.removeListener("d") //want to not find a fn



