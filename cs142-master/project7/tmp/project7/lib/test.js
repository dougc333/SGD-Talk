
import fetchModel from './fetchModelData'


fetchModel("GET",'http://localhost:3000/user/list')
.then(data=>console.log(data))
.catch(error=>console.log(error));