import * as fs from 'fs'

class ReadMe{

  constructor(){
    var stuff = fs.readFileSync('test.txt');
    console.log("stuff:",stuff);
  }
}

var r = new ReadMe()

