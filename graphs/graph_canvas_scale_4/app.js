const graph_element = document.getElementById("graphdiv");
const canvas_element = createCanvasElement(graph_element)
const SCALING_FACTOR = Math.floor(8000/800.)


const data = formatData(mcs2000,pcs2000)

function createCanvasElement(parent){
    const canvas = document.createElement("canvas")
    parent.appendChild(canvas)
    canvas.style.height = "100%"
    canvas.style.width = "100%"
    
    return canvas

}

//800 vs 8000 div size
function formatData(mcs,pcs){
    local_data=[]
    mcs.map((x,i)=>{
        local_data.push([x/SCALING_FACTOR,pcs[i]/SCALING_FACTOR])
    })
    return local_data
}

console.log(data)

function plotData(canvas, data){
    const ctx = canvas.getContext("2d")
    //console.log("canvas.clientHeight", canvas.clientHeight, "canvas.clientWidth", canvas, "canvas height", canvas.height, "canvas width", canvas.width)
    canvas.height = canvas.clientHeight
    canvas.width = canvas.clientWidth
    console.log(canvas.height)
    ctx.fillRect(76,76,10,10)
    data.map(x=>{
        x_translated = x[0]
        y_translated = canvas.height - x[1] - 1
        ctx.fillRect(x_translated, y_translated,10,10)
    })
}

plotData(canvas_element,data)


