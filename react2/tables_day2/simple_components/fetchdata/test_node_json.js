import data from './test.json' assert { type: "json" }

//need this here to remember the assert for the import 
const getDataFile=()=>{
  console.log(data)
}
//eval converts string to JSON object. 
const getData= async ()=>{
    
    const response = await fetch('http://localhost:5173/NLSY2.json');
    const body = await response.text();
    JSON.parse(body).map(x=>(console.log(JSON.stringify(x["R0000100"]))))
    //(eval).map(x=>(console.log(JSON.stringify(x["R0000100"]))))
    //eval works to convert string to JSON object. 
}

getDataFile()
getData() 

