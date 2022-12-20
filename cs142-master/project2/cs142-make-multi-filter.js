'use strict';


function cs142MakeMultiFilter(origArray){
    let currArray =  Array.from(origArray);
    
    function af(fn, callback){
      if(typeof(fn)!=='function'){
        return currArray;
      }
      currArray = currArray.filter(fn);

      if (typeof(callback)==='function'){
         callback.call(origArray,currArray);
      }
      return af;
    }
    return af;
}


