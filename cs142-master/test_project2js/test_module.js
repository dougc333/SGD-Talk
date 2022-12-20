var my_module = (function(){
    'use strict';
    console.log('my_module');

    var public_prop = 'public_prop';
    var _private_prop = 'private_prop';

    function _privateMethod(){
        console.log(_privateMethod);
    }

    function publicMethod(){
        console.log(publicMethod);
    }

    //cant get last semicolon right. 
    return {
        publicMethod:publicMethod,
        public_prop:publicMethod
    };

    //return {
    //    publicMethod:function(){
    //        console.log('publIcMethod');
    //    }
    //};

})();

my_module.publicMethod();
console.log("end")
console.log("public_prop:",my_module.public_prop);
console.log("end")
console.log("public method:",my_module.publicMethod());
console.log("end")
console.log("private method:",my_module._privateMethod())
console.log("end")
console.log("private prop:",my_module._private_prop);