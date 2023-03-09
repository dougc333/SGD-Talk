let proto={a:1, b:2, c:3};
let obj = {a:0};

obj.__proto__=proto;

console.log(obj.a, obj.b, obj.c); // 0, 2,3
proto.a=5;
proto.b=6;
proto.c=7;
console.log(obj.a, obj.b, obj.c); //0,6,7



