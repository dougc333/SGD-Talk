// new feature allows additional args to be in array using spread notation
//reserved array arguments for the other args in funcction parameters
//

function old(a=1){
    console.log(a,arguments.length,arguments);
}

function newer(a=1,...otherArgs){
    console.log(a,otherArgs);
}

old();  //0 1
old(1,2,3); //1, 3
newer(1,2,3); //1 [2,3]