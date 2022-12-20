var assert = require('assert');
'use strict';

function makeMultiFilter(origArr){
    //arrayFilterer
    currentArr = Array.from(origArr);
    console.log("start currentArr:",currentArr)

    var arrayFilterer =  function(filterCriteria,callback){
        if (arguments.length===1){
            console.log('one arg');
            if (typeof(filterCriteria)!=='function'){
                return currentArr;
            }
        }
       
        for (let i = 0;i<origArr.length;i++){
            console.log(origArr[i]);
            var result_i = filterCriteria(origArr[i]);
            console.log('result_i:',result_i);
            if (result_i===false){
                currentArr.splice(i,1);
            }
        }
        console.log('currentArr:',currentArr," origArray:",origArr);
        if (typeof(callback)!=='function'){
            return currentArr;
        }
        //callback = callback.bind(origArr);
        callback.call(origArr,currentArr)
        //var cb_result = callback(currentArr);
        return arrayFilterer;
    }
    return arrayFilterer;
}

var mf = makeMultiFilter([1,2,3,4,5,6]);
//mf(function(elem){return elem!==2;},
 //  function(currArray){
//     console.log(this); 
//     console.log(currArray)
//    });
var remove3 = function (elem){
    return elem!==3;
}
var remove4 = function(elem){
    return elem!==4;
}
var res = mf(remove3);
console.log("res:",res);
assert(res,[1,2,4,5,6])

var test_onearg_nofunc = mf(4);
console.log('test_onearg_nofunc:',test_onearg_nofunc);
assert(test_onearg_nofunc,[1,2,4,5,6])


mf(remove4,function(currentArray){
  console.log("callback this:",this);
  console.log("callback currentArray:",currentArray);
});


function filterTwos(elem) { return elem !== 2; }
function filterThrees(elem) { return elem !== 3; }
var arrayFilterer3 = makeMultiFilter([1,2,3]);
var arrayFilterer4 = makeMultiFilter([4,5,6]);
console.log(arrayFilterer3(filterTwos)());	// prints [1,3]
console.log(arrayFilterer4(filterThrees)());	// prints [4,5,6]



function filterTwos(elem) { return elem !== 2; }
function filterThrees(elem) { return elem !== 3; }
var arrayFilterer2 = makeMultiFilter([1,2,3]);
console.log('a:',typeof(arrayFilterer2));
console.log('####')
console.log('b:',typeof(arrayFilterer2(filterTwos)));

//var currentArray2 = arrayFilterer2(filterTwos)(filterThrees)();