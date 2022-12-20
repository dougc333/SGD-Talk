//start webserver node webServer.js in another terminal windiw
//run this file node test2.js and it should print out
//[{"_id":"57231f1a30e4351f4e9f4bd7","first_name":"Ian","last_name":"Malcolm","location":"Austin, TX","description":"Should've stayed in the car.","occupation":"Mathematician"},{"_id":"57231f1a30e4351f4e9f4bd8","first_name":"Ellen","last_name":"Ripley","location":"Nostromo","description":"Lvl 6 rating. Pilot.","occupation":"Warrant Officer"},{"_id":"57231f1a30e4351f4e9f4bd9","first_name":"Peregrin","last_name":"Took","location":"Gondor","description":"Home is behind, the world ahead... And there are many paths to tread. Through shadow, to the edge of night, until the stars are all alight... Mist and shadow, cloud and shade, all shall fade... all... shall... fade... ","occupation":"Thain"},{"_id":"57231f1a30e4351f4e9f4bda","first_name":"Rey","last_name":"Kenobi","location":"D'Qar","description":"Excited to be here!","occupation":"Rebel"},{"_id":"57231f1a30e4351f4e9f4bdb","first_name":"April","last_name":"Ludgate","location":"Pawnee, IN","description":"Witch","occupation":"Animal Control"},{"_id":"57231f1a30e4351f4e9f4bdc","first_name":"John","last_name":"Ousterhout","location":"Stanford, CA","description":"<i>CS142!</i>","occupation":"Professor"}]

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