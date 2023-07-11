
import {S3Client, ListBucketsCommand} from '@aws-sdk/client-s3'


exports.main = async function(event:string){
  try{
    console.log(event)
    const input = undefined
    const client = new S3Client({})
    //console.log("client:",client)
    const buc = new ListBucketsCommand({})
    const data =  await client.send(buc)
    console.log("data:",data.Buckets)
    return data

  }catch(error){
    return {
      statusCode:400,
      headers:{},
      body:JSON.stringify("error")
    }
  }
}
