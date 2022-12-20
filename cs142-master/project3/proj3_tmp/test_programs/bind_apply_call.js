//bind changes the this pointer to arg in bind fn is not executed
//call and apply execute the fn

function getThis(){
    console.log(this);
}

console.log("getThis should point to global object");
getThis();
console.log("bindThis binds this to test_obj to an object");
let bindThis = getThis.bind({name:'test_obj'});
bindThis();
console.log("......call and apply........");
console.log("if no args bind and apply are the same");
function test_bind_apply(){
    console.log("test bind and apply no args");
    console.log("this:",this);
}

test_bind_apply.apply({name:"apply"}); //apply executes test_bind_apply
test_bind_apply.call({name:"call"}); //call executes test_bind_apply
console.log("can see call and apply set this pointer to the object in the args, no longer global obj");
console.log("test apply and bind with 2 args in fn");
function test_2args(one, two){
  console.log("first arg:",one, "second arg:",two);
  console.log("this:",this);
}
console.log("testing apply 2args")
test_2args.apply({name:'firstObj'},[1,2]); //apply first arg is this, second is array, no global object replacement
console.log("testing call 2args");
test_2args.call({name:'nextObj'},3,4); //nonstrict mode null and undefined replaced w/global obj. 
console.log("the first arg is this reference in fn w/multiple args");
console.log("test callback bind");
function getThis(){
    console.log(this);
}
function callbackBindToDoge(callback){
    let boundCheck = callback.bind({doge:"such callback"});
    boundCheck();
}
callbackBindToDoge(getThis);



//fn using bind can only bind ONCE!!! cannot change it later!!! 
