var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
xhr.onreadystatechange=function(){
  console.log('xhr.readyState:',xhr.readyState);
  console.log('xhr.responseText:',xhr.responseText);
  if (xhr.readyState===4){
    console.log("DONE");
    console.log("responseText:",xhr.responseText);
  }
}
//xhr.open('GET','http://localhost:3000/test/info');
xhr.open('GET','http://localhost:3000/user/list');
xhr.send();

