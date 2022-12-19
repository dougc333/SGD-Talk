import {getB} from './second'

const a = "aaaaaa"

function hello(who:string):void{
  console.log(who)
}


export default function h(){
  hello(a)
  getB()
}

h()




