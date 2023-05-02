const graph_element = document.getElementById("graphdiv")
const x_start = 0
const y_start = 6500
const slope= 0.54

const lineStart =[x_start,y_start]
//const lineEnd = [x_end,y_end]


const pcs2000_min = Math.min(...pcs2000)
const pcs2000_max = Math.max(...pcs2000)
const mcs2000_min = Math.min(...mcs2000)
const mcs2000_max = Math.max(...mcs2000)





//console.log(pcs2000_min,pcs2000_max,mcs2000_min,mcs2000_max)

canvas_element = document.createElement("canvas")
graph_element.appendChild(canvas_element)
canvas_element.style.height="100%"
canvas_element.style.width="100%"
canvas_element.height = canvas_element.clientHeight
canvas_element.width = canvas_element.clientWidth

//offset includes scrollbar and padding. 
console.log(canvas_element.height, canvas_element.width,canvas_element.clientHeight, canvas_element.clientWidth,canvas_element.offsetHeight, canvas_element.offsetWidth, canvas_element.offsetHeight)
//calculate scale factor 
mcs_scale=mcs2000_max/canvas_element.width
pcs_scale = pcs2000_max/canvas_element.height

let data = []
ctx = canvas_element.getContext("2d")
//ctx.save()
mcs2000.filter((x,i)=>{
    data.push([x,pcs2000[i]])
    ctx.fillRect(Math.floor(x/mcs_scale),Math.floor(canvas_element.height - pcs2000[i]/pcs_scale),10,10)
})
ctx.restore()
//plot line
ctx.beginPath()
const draw_start_x = Math.floor(x_start/mcs_scale)
const draw_start_y = Math.floor(canvas_element.height - y_start/pcs_scale)
const draw_end_x = Math.floor(mcs2000_max/mcs_scale)
const draw_end_y = Math.floor(canvas_element.height-5500./pcs_scale)
ctx.moveTo(draw_start_x,draw_start_y)
ctx.lineTo(draw_end_x, draw_end_y)
ctx.lineWidth = 2
ctx.strokeStyle = '#FF0000'
ctx.stroke()

console.log(draw_start_x,draw_start_y,draw_end_x,draw_end_y)





