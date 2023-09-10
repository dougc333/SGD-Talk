//https://stackoverflow.com/questions/64858771/using-a-map-function-instead-of-a-nested-loop-condition-js


outer = [
{
  id:1, 
  following: ["hello","this","is","the","first","one"]
},{
  id:2,
  following: ["bye", 'this','is','the','second','two']
},{
  id:3,
  following: ['he', 'who', 'laughs', 'last', 'laughs', 'best']
}
]
//cant use some()
let seen = {}
const finddups = ()=>{
  for (let i=0;i<outer.length;i++){
    let o = outer[i]
    for(let j=0;i<o.following.length;j++){
      console.log("testing:",following[j])
      if(following[j] ===)
    }
  }
}