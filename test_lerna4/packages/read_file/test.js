"use strict";
exports.__esModule = true;
var fs = require("fs");
var ReadMe = /** @class */ (function () {
    function ReadMe() {
        var stuff = fs.readFileSync('test.txt');
        console.log("stuff:", stuff);
    }
    return ReadMe;
}());
var r = new ReadMe();
