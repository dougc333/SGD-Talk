var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();


//xhr.open('GET','http://localhost:3000/test/info');
xhr.open('GET','http://localhost:3000/user/list');
xhr.onload=function(){
  console.log(xhr.responseText);
}
xhr.send();

