"use strict";
exports.__esModule = true;
var fs = require("fs");
var ReadFile = /** @class */ (function () {
    function ReadFile() {
        this._filename = "./test.txt";
        var fh = fs.readFileSync(this._filename, { encoding: 'utf8', flag: 'r' });
        console.log(fh);
    }
    return ReadFile;
}());
var rf = new ReadFile();
