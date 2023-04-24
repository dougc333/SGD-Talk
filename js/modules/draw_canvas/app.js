const parent = document.getElementById("graphdiv")


const canvas_element = document.createElement("canvas")
parent.appendChild(canvas_element)
console.log(canvas_element.getBoundingClientRect())

const width = canvas_element.getBoundingClientRect().width
const height = canvas_element.getBoundingClientRect().height



client_width = canvas_element.getBoundingClientRect().client_width
const ctx = canvas_element.getContext("2d")
ctx.beginPath()
ctx.moveTo(width, height)
ctx.lineTo(width+10, height+10)
ctx.stroke()

ctx.fillRect(10,10,10,10); // fill in the pixel at (10,10)
