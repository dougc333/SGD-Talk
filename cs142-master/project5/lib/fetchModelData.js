var Promise = require("Promise");

/**
  * FetchModel - Fetch a model from the web server.
  *     url - string - The URL to issue the GET request.
  * Returns: a Promise that should be filled
  * with the response of the GET request parsed
  * as a JSON object and returned in the property
  * named "data" of an object.
  * If the requests has an error the promise should be
  * rejected with an object contain the properties:
  *    status:  The HTTP response status
  *    statusText:  The statusText from the xhr request
  *
*/


function fetchModel(url) {
  return new Promise(function(resolve, reject) {
      //console.log("fetchModel:",url);
      //setTimeout(() => reject({status: 501, statusText: "Not Implemented"}),0);
      // On Success return:
      // resolve({data: getResponseObject});
      let xhr = new XMLHttpRequest();
      xhr.open("GET",url);
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


export default fetchModel;
