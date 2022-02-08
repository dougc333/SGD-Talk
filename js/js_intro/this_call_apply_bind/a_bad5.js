// Technique 1
function A(){}
A.prototype.foo_prop = "foo val";
function bar(){}
var proto = {
  bar_prop: "bar val",
  __proto__: A.prototype
};
bar.prototype = proto;
var inst = new bar();
console.log(inst.foo_prop);
console.log(inst.bar_prop);

