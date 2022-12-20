//wont work w function decl or fn

function normalize_array(){
    console.log(this.arr.map(x=>x/this.arr.length));
}
//cant do w function
arr = [1,2,3]
console.log("this.arr:",this.arr); //undefined but defined in node interactive console runtime
normalize_array.call({arr}); //need to make obj, can't use arr

