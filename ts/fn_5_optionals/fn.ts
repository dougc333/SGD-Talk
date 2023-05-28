
class tsp{
  name:string
  amt:number
  grams:number
  conversion_gms_to_tsp:number

  constructor(name: string, amt: number, grams: number,conversion_gms_to_tsp:number) {
    this.name = name;
    this.amt = amt
    this.conversion_gms_to_tsp = conversion_gms_to_tsp;
    this.grams = this.amt + this.conversion_gms_to_tsp
  }
}

class TspFlour extends tsp{
 name: string="tsp_flour"
 amt: number 
 grams: number 
 conversion_gms_to_tsp = 4.2

 constructor(amt:number) {
    //feels silly to put in default
    super("",0,0,0)
    this.amt = amt
    this.grams = this.amt * this.conversion_gms_to_tsp
 }

 toString(){
    return this.name
}
}

class TspYeast extends tsp{
    name: string="tsp_yeast"
    amt: number
    grams: number
    conversion_gms_to_tsp: number = 4.0

    constructor(amt:number){
       super("",0,0,0) //this seems silly
       this.amt = amt
       this.grams = this.amt * this.conversion_gms_to_tsp
    }
    
}

// a template literal calls toString() but default implementation is Object

//optional fn parameter
const printIgredients=(sugar:string, amt:number, amt_flour:TspFlour)=>{
  console.log(`${sugar} ${amt} ${JSON.stringify(amt_flour)}`)
  console.log(amt_flour)
  console.log(`${amt_flour}`)
  //this is the default without a JSON.stringify call or toString() method in the class. object Object for a template literal call. 
  const amt_yeast = new TspYeast(10)
  console.log(`${amt_yeast}`)
}

printIgredients("sugar", 10, new TspFlour(1))
//optional fields in interface

function printWithOption(sugar:string, amt:number, amt_flour?:TspFlour){
    console.log(`${sugar} ${amt} ${JSON.stringify(amt_flour) ? JSON.stringify(amt_flour):"empty stuff"} `)
}

printWithOption("sugar empty flour",10)
printWithOption("sugar ",10,new TspFlour(10))


interface User{
    id:string
    info?: {
      email?:string
    }
}

function checkUser(user:User):string{
    if (user.info){
        //exclamation point to get rid of error when making return type string. 
        return user.info.email!
    }    
    return ""
}

//equivalent to above function
function checkUserEasy(user:User):string{
  return user?.info?.email ?? ""

}

