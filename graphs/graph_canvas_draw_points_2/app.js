
const graph_div = document.getElementById('graphdiv');
const canvas_element = createCanvasElement(graph_div)


function createCanvasElement(parent) {
 const canvas = document.createElement('canvas')
 parent.appendChild(canvas)
 canvas.style.height='100%'
 canvas.style.width='100%'
 canvas.height = canvas.clientHeight 
 canvas.width= canvas.clientWidth
 
 return canvas

}

function drawOrigin(canvas, x, y) {
  
  console.log("canvas height="+canvas.height+" width="+canvas.width)
  console.log("canvas offsetHeight="+canvas.offsetHeight+" offsetWidth="+canvas.offsetWidth)
  console.log("canvas bounding rectangle:",canvas.getBoundingClientRect())
  const x_tranlated = x

  const y_translated = canvas.height - y - 1 - canvas.getBoundingClientRect().y
  console.log("x_translated: " + x_tranlated + ", y_translated:" + y_translated)
  const ctx = canvas.getContext("2d")
  ctx.fillRect(x_tranlated, y_translated, 10,10)

}

function drawPoint(canvas, x, y){
  
}

drawOrigin(canvas_element, 0, 0 )

//drawPoint(canvas_element,x,y)





