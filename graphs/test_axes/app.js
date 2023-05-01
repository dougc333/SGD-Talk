


const test_axes_element = document.getElementById("test_axes");



const createCanvasElement = function(parent){
    const canvas_element = document.createElement("canvas");
    parent.appendChild(canvas_element);

    canvas_element.style.height="100%"
    canvas_element.style.width="100%"
    canvas_element.height = canvas_element.clientHeight
    canvas_element.width = canvas_element.clientWidth

    return canvas_element
}

const canvas_element = createCanvasElement(test_axes_element)

function num_xticks(canvas_element){
    return 4
}

function num_yticks(){
    return 6
}

const drawAxes = (canvas_element)=>{
    context = canvas_element.getContext("2d")
    //context.save()
    context.beginPath()
    //canvas_element.height = canvas_element.clientHeight
    //canvas_element.width = canvas_element.clientWidth
    console.log("canvas_element height:",canvas_element.height, "canvas_element width:", canvas_element.width )
    const x_incr = Math.floor(canvas_element.width/num_yticks())
    const y_incr = Math.floor(canvas_element.height/num_xticks())
    for(let i=0;i<num_yticks();i++) {
    context.moveTo(20+i*x_incr,canvas_element.height-20) //bottom_margin
    context.lineTo(20+i*x_incr, 20) //top_margin
    context.stroke()
    }

    for(let i=0;i<num_yticks();i++) {
        context.moveTo(20,canvas_element.height-20-i*y_incr) //bottom_margin
        context.lineTo(canvas_element.width-20, canvas_element.height-20-i*y_incr) //top_margin
        context.stroke()
    }   
    
    
    //context.restore()
}

function drawLabels(){
    
}

drawAxes(canvas_element)