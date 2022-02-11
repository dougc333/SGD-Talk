1) demo this pointer is attached by babel using the babel-plugin-transform-class-properties
create directory
cd into directory
npm init 
create a js class with arrow function and save to file.js

class Test{
  let x=10
  foo=()=>{
    console.log(this.x)
  }
}
create a .babelrc file with 
{
   "presets":["@babel/env"],
    "plugins": ["@babel/plugin-proposal-class-properties"]
}

npx babel 
