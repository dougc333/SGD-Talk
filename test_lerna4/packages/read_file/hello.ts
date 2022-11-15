import * as fs from 'fs'

class ReadFile{
  _filename = "./test.txt"
  constructor(){ 
    var fh = fs.readFileSync(this._filename,{encoding:'utf8', flag:'r'});
    console.log(fh);
  }
}

let rf = new ReadFile()
