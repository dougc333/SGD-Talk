let result = function(score){
  return new Promise(function(resolve, reject){
     console.log("checking score")
     if (score>50){
	resolve("resolved greater than 50")
     }else{
	reject("less than 50 rejected")
     }
     
  })
}

//same as function result()

let grade = function(response){
    return new Promise(function(resolve,reject){
	console.log("grading")
	resolve("grade A:",response)
    })
}


result(80).then(response=>{
	  console.log("results received")
 	  return grade(response)
        }).then(finalgrade=>{
	   console.log(finalgrade)
        }).catch(err=>{
	   console.log("err")
        })

//we can implement the same as above promise chaning with async and await
//the lifecycle Promise.response()
