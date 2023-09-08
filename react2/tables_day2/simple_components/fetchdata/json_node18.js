console.log("test")


const getData = async()=>{
const response = await fetch('https://httpbin.org/post', {method: 'POST', body: 'a=1'});
// const data = await response.json();
let total=0
let stuff= ""
for await (const chunk of response.body){
  total +=chunk.length
  stuff=stuff+chunk
  console.log(chunk)
}
console.log(total)
console.log(stuff)
}

getData()

