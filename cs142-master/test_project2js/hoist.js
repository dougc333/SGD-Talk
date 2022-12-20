
//'use strict';
// undefined runtime crash console.log("outside outer funcgtion foo2",foo2);
console.log("asdf");
var global=1;
function fn(){
    fn1();
    // undefined runtime crash console.log(" inside outer function foo2:", foo2);
    function fn1(){
       foo2=100; //this should work
       console.log('you should not see 100 if no hoisting:',foo2);
        if (global>0){
            var foo2 = 1;
            console.log(foo2);
        }
        console.log("after if:",foo2);
    }
    // undefined runtime, console.log("after innter function foo2:",foo2);

}
//odd I remember JS used to hoist to global scope not to top of current scope. 
//
fn();

