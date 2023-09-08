import data from './test.json' assert { type: "json" }


const getDataFile=()=>{
  console.log(data)
}

const getData= async ()=>{
    const arr=[1,2,3,4]
    const response = await fetch('http://localhost:5173/NLSY2.json');
    const body = await response.text();
    eval(body).map(x=>(console.log(x)))
    // body.map(x=>console.log(x))
    //  arr.map(x=>console.log(x))
}

getDataFile()
getData() 

