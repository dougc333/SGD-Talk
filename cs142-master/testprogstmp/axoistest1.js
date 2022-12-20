//import axios from 'axios';
const axios = require('axios').default;

axios.get('http://localhost:3000/user/list')
  .then((response) => {
    console.log(response.data);
  }, (error) => {
    console.log(error);
  }).finally(function(data){
      console.log("done")
  });


  axios.get('http://localhost:3000/user/5ec06bab46a9ca3953fa5581')
  .then((response) => {
    console.log(response.data);
  }, (error) => {
    console.log(error);
  }).finally(function(data){
      console.log("done")
  });
async function getData(){
  var pd = await axios.get('http://localhost:3000/photosOfUser/5ec06bab46a9ca3953fa5581')
  .then((response) => {
    //console.log(response.data);
    return response.data;
  }, (error) => {
    console.log(error);
  }).finally(function(response){
      console.log("done")
  });
  console.log("pd:",pd);
}
getData();