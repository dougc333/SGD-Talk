const parent = document.getElementById("graphdiv")
//default height canvas 150px. 

const canvas_element = document.createElement("canvas")
canvas_element.style.height='100%'
canvas_element.style.width='100%'


parent.appendChild(canvas_element)
console.log(canvas_element.getBoundingClientRect())

const width = canvas_element.getBoundingClientRect().width
const height = canvas_element.getBoundingClientRect().height
console.log("width: " + width + ", height: " + height)


function draw_point(x,y){
  const ctx = canvas_element.getContext("2d")
 
  x_left_lower = canvas_element.getBoundingClientRect().x
  y_left_lower = canvas_element.getBoundingClientRect().height
  console.log("x_left_lower: " + x_left_lower + ", y_left_lower: " + y_left_lower)

  x_translate = x
  console.log("x_translate: " + x_translate )
  console.log("canvas offset_height: " + canvas_element.offsetHeight+" canvas offset_width:"+canvas_element.offsetWidth)
  //have to set canvas height to offset_height? 
  canvas_element.height = canvas_element.offsetHeight
  canvas_element.width = canvas_element.offsetWidth
  console.log("canvas height: " + canvas_element.height+" canvas width:"+canvas_element.width)
  const border_width = 1
  const y_translate = canvas_element.height - border_width -  canvas_element.getBoundingClientRect().y
  console.log("y translate:",y_translate)  

  //1 pixel for border
  ctx.fillRect(x_translate, y_translate, 10, 10); // fill in the pixel at (10,10)
  
}

draw_point(0,0)

const pcs2000_min = Math.min(...pcs2000)
const pcs2000_max = Math.max(...pcs2000)

const mcs2000_min = Math.min(...mcs2000)
const mcs2000_max = Math.max(...mcs2000)
console.log("pcs2000_min: ", pcs2000_min, " pcs2000_max: ", pcs2000_max)
console.log("mcs2000_min: ", mcs2000_min, " mcs2000_max: ", mcs2000_max)


function makeData() {
  data=[]
  for (let i=0;i<pcs2000.length;i++) {
    data.push([pcs2000[i],mcs2000[i]])
  }
}

makeData()

//console.log(data)