const graph_element = document.getElementById("graphdiv")


//when creating canvas element need to set offsetheight and offsetwidth to parent
function createCanvasElement(parent) {
  const canvas_element = document.createElement("canvas")
  canvas_element.style.height='100%'
  canvas_element.style.width='100%'
  canvas_element.height = canvas_element.offsetHeight
  canvas_element.width = canvas_element.offsetWidth
  parent.appendChild(canvas_element)

}

createCanvasElement(graph_element)

function drawPoint(){

}


drawPoint(0,0)




