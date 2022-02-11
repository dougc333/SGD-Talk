console.log("global this:", this);
console.log("globalThis:", globalThis);
console.log("global:", global);

try {
  console.log("self:", self);
} catch (err) {
  console.log("self err:", err);
}
try {
  console.log("window:", window);
} catch (err) {
  console.log("window err:", err);
}
function test_fn() {
  console.log("this test_fn", test_fn);
}

test_fn();

class Person {
  constructor() {
    let _name = "Bob";
  }

  printThis() {
    console.log("this:", this);
  }
  class_foo() {
    console.log("this in class_foo:", this);
    setTimeout(function () {
      console.log("class_foo setTimeout this:", this);
    }, 0);
  }
}

p = new Person();
p.printThis();
p.class_foo();
console.log("testing object literal");
var obj_literal = {
  name: "Sam",
  foo: function () {
    console.log("object literal this in foo:", this);
    setTimeout(function () {
      console.log("object literal this inside setTimeout:", this);
    }, 0);
  },
};

obj_literal.foo();
setTimeout(function () {
  console.log("this global setTimeout:", this);
}, 0);
