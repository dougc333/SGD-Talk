
const AWS = require('aws-sdk')
const s3 = new AWS.S3()


const bucketName = "foo987987987"

exports.main = async function(event,context){
  try{
    console.log("entering lamda")
    const data = await s3.listObjectsV3({Bucket:bucketName}).promise()
    console.log(data)
  }catch(error){
    return {
      statusCode:400,
      headers:{},
      body:JSON.stringify("error")
    }
  }
}