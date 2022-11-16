const {exec} = require("child_process")


exec('aws ce get-cost-and-usage --time-period Start=2022-09-01,End=2022-11-01 \
    --granularity MONTHLY \
    --metrics "BlendedCost" "UnblendedCost" "UsageQuantity" \
    --group-by Type=DIMENSION,Key=SERVICE Type=TAG,Key=Environment',(error, stdout, stderr)=>{
   if(error){
     console.log(`error: ${error.message}`)
     return;
   }
   if (stderr){
     console.log(`stderr:${stderr}`)
     return
   }

   console.log(`stdout:${stdout}`)
   var res = stdout
   var json_res = JSON.parse(res)
   console.log(typeof(json_res))
   Object.keys(json_res).forEach(function(key){
      console.log("key",key," value:",json_res[key])
   })
     
 })


