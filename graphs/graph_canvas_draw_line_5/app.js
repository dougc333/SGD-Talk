const graph_element = document.getElementById("graphdiv")
const x_start = 0
const y_start = 5000
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
ctx = canvas_element.getContext("2d")



