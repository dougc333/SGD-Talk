const graph_element = document.getElementById("graphdiv")
const canvas_element = document.createElement("canvas")

//when creating canvas element need to set offsetheight and offsetwidth to parent
function createCanvasElement(parent,canvas_elem) {
  canvas_elem.style.height='100%'
  canvas_elem.style.width='100%'
  canvas_elem.height = canvas_elem.offsetHeight
  canvas_elem.width = canvas_elem.offsetWidth
  parent.appendChild(canvas_elem)

}

createCanvasElement(graph_element,canvas_element)

//fucked up canvas element heigh tand widh reset!!! 
function drawPoint(canvas_elem, x,y){
  canvas_elem.height = canvas_elem.offsetHeight
  canvas_elem.width = canvas_elem.offsetWidth
  const x_translated = x
  const border_width = 1
  const y_translated = canvas_elem.clientHeight - y - border_width - canvas_elem.getBoundingClientRect().y
  var ctx = canvas_elem.getContext("2d")
  console.log("x_translated: " + x_translated+" y_translated: " + y_translated)
  ctx.fillRect(x_translated, y_translated, 10, 10)
  
}


drawPoint(canvas_element, 0,0)




