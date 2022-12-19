"use strict";
exports.__esModule = true;
var second_1 = require("./second");
var a = "aaaaaa";
function hello(who) {
    console.log(who);
}
function h() {
    hello(a);
    (0, second_1.getB)();
}
exports["default"] = h;
h();
