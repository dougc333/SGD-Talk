//call , calls() on function specify this of function and args for function. 


function func(arg){
    console.log(this,arg);
}

func.call({t:1},2);
