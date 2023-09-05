"use strict";
//ts dont use module.exports
//use es 
//use default export then import is easier, import is fn name without named import syntax
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nullcoalescing = exports.chain = exports.getName2 = exports.getName = exports.rest_fn = exports.getData = exports.fn_union = exports.a = exports.add_nums = void 0;
function add_nums(a, b) {
    return a + b;
}
exports.add_nums = add_nums;
function a(a, b) {
    return a + b;
}
exports.a = a;
function fn_union(a, b) {
    var arr = [a, b];
    console.log(arr);
}
exports.fn_union = fn_union;
var getData = function (url) { return Promise.resolve("data from url"); };
exports.getData = getData;
//multiple args and put into array
var rest_fn = function (a, b) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    console.log("before adding parameters into single array:", a, b, args.join(","));
    var arr = __spreadArray([a, b], args, true);
    console.log('after adding all parameteers into array:', arr.join(","));
};
exports.rest_fn = rest_fn;
//types are enforced at compile time and not runtime for JS compatability. 
//and for runtime speed. 
var getName = function (user) {
    console.log("use comma:", user.first, user.second);
};
exports.getName = getName;
//not so rigid.
var getName2 = function (user) {
    console.log("use semicolon:", user.first, user.second);
};
exports.getName2 = getName2;
//chaining operator for js compatability
//npx tsc fns-test.ts  to compile to js.
function chain(user) {
    return "".concat(user === null || user === void 0 ? void 0 : user.first, " ").concat(user === null || user === void 0 ? void 0 : user.second);
}
exports.chain = chain;
//null coalescing if not undefinued
function nullcoalescing(user) {
    var _a, _b;
    return "".concat((_a = user === null || user === void 0 ? void 0 : user.first) !== null && _a !== void 0 ? _a : 'first from null coalescing', " ").concat((_b = user === null || user === void 0 ? void 0 : user.second) !== null && _b !== void 0 ? _b : "second from null coalescing");
}
exports.nullcoalescing = nullcoalescing;
