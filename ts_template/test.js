"use strict";
exports.__esModule = true;
var yargs = require("yargs");
console.log("asdf");
function parseCommandLineArguments() {
    //constinitTemplateLanguages = await availableInitLanguages();
    return yargs
        .env("CDK");
}
var a = parseCommandLineArguments();
console.log(typeof (a));
console.log(JSON.stringify(a));
