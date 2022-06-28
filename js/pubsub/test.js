const moduleA = require("./pub.js");
const moduleB = require("./sub.js");

console.log("moduleA:",moduleA);
console.log("moduleB:",moduleB);
moduleA.publishEvent();
moduleA.publishEvent();


