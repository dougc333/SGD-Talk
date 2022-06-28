const sayHello = require('./f');
//confusing sayHello should be the parent or imported object namespace for the file f. maybe a better choice is f

const f = require('./f');

sayHello.sayHello();
f.sayHello();


