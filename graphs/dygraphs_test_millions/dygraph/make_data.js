const fs = require('fs')



function make_csv(){
   const startTime =  Date.now()
   i = 0
   while (i<1000000){
     try{
       fs.writeFileSync('stuff.csv',i.toString()+','+Math.random().toString()+'\n', { flag: 'a+' })
     }catch(err){
       console.error(err)
     }
     i+=1
   }
   const endTime = Date.now()
   console.log("elapsed time:", endTime - startTime)
}

make_csv()


