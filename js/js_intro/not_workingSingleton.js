//how to make a singleton? 
function Singleton(){
    var stuff="stuff ivar"
    if (!Singleton._instance){
        Singleton._instance=this
    }

    Singleton.getInstance = function () {
        return this._instance;
      };
    
    return Singleton._instance
}

let s= Singleton
console.log("s:",s)
console.log("s.getInstance:",s.getInstance)
Singleton()
console.log("Singleton.getInstance:",Singleton.getInstance)
console.log(Singleton.stuff)
//let u = new Singleton()
//console.log("u:",u)

