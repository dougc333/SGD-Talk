// Technique 2
function foo(){}
foo.prototype.foo_prop = "foo val";
function bar(){}
var proto;
proto = Object.setPrototypeOf(
  { bar_prop: "bar val" },
  foo.prototype
);
bar.prototype = proto;
var inst = new bar();
console.log(inst.foo_prop);
console.log(inst.bar_prop)

