

const graph_element = document.getElementById("graphdiv");

const createCanvasElement=(graph_element)=>{
    const canvas = document.createElement("canvas")
    graph_element.appendChild(canvas)
  
    canvas.style.height = "100%"
    canvas.style.width = "100%"
  
    canvas.height = canvas.clientHeight
    canvas.width = canvas.clientWidth
  
    return canvas
    
  }
  
const canvas_element = createCanvasElement(graph_element)



const createData = ()=>{
    local_data = []
    for (let i=0; i<pcs2000.length; i++){
        local_data.push([pcs2000[i],mcs2000[i]])
    }
    return local_data
}

const createData2 = ()=>{
    local_data = []
    pcs2000.map((x,i)=>{
      local_data.push([x,mcs2000[i]])
    })
    return local_data
}

const compareArrays = (data, data2)=>{
    data.map((x,i)=>{
     if(x[0]!=data2[i][0] || x[1]!=data2[i][1]){
        return false
     }    
    })
}


const data = createData()
const data2 = createData2()
console.log("compareArrays: ",compareArrays(data,data2))


//verify origin displays correctly
const drawOrigin=(canvas_element)=>{
    const x = 0
    const y = 0
    //set to 1px. how to add x-axis to this and subract this used area? 
    const border_width = 1
    const x_translated = x
    const y_translated = canvas_element.height - y - border_width
    console.log("x_translated:",x_translated," y_translated:",y_translated)
    const ctx = canvas_element.getContext("2d")
    ctx.fillRect(x_translated, y_translated,10,10)
}

const drawPoints = (canvas_element,data)=>{
    const ctx = canvas_element.getContext("2d")
    data.map(x=>{
        x_translated = x[0]
        y_translated = canvas_element.height - x[1] - 1
        ctx.fillRect(x_translated,y_translated,10,10)
    })
}


drawOrigin(canvas_element)
drawPoints(canvas_element,data)
