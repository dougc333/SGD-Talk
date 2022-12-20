var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var request = (method,url)=>{
  return new Promise((resolve,reject)=>{
    let xhr = new XMLHttpRequest();
    xhr.open(method,url);
    //console.log('a');
    xhr.onload=()=>{
      //console.log('onload',xhr.status);
      if (xhr.status>=200 && xhr.status<300){
        //console.log("b ",xhr.responseText);
        resolve(xhr.responseText);
      }else{
        reject(xhr.statusText);
      }
    };
    xhr.send();
  });
}

request("GET",'http://localhost:3000/user/list')
.then(data=>console.log(data))
.catch(error=>console.log('error'));

