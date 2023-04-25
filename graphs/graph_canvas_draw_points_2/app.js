
const graph_div = document.getElementById('graphdiv');
const canvas_element = createCanvasElement(graph_div)



function findRange(){
  const pcs2000_max = Math.max(...pcs2000)
  const pcs2000_min = Math.min(...pcs2000)
  const mcs2000_max = Math.max(...mcs2000)
  const mcs2000_min = Math.min(...mcs2000)
  
  console.log("pcs2000 max: " + pcs2000_max)
  console.log("pcs2000 min: " + pcs2000_min)
  console.log("mcs2000 max: " + mcs2000_max)
  console.log("mcs2000 min: " + mcs2000_min)
  data=[]
  for (let i=0;i<pcs2000.length; i++){
    data.push([pcs2000[i],mcs2000[i]])
  }
  console.log(data)
  return data
}

data = findRange()

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

function drawPoints(canvas, data){
  //at origin point
  console.log("canvas.height: " + canvas.height+" canvas.width: " + canvas.width)
  console.log("data[0]:",data[0])
  const ctx = canvas.getContext("2d")
  for (let i=0; i<data.length; i++){
    x_translated = data[i][0]
    y_translated = canvas.height - data[i][1]
    ctx.fillRect(x_translated, y_translated, 10,10)
  }
}

drawOrigin(canvas_element, 0, 0 )

drawPoints(canvas_element,data)





