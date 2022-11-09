import * as yargs from 'yargs'
import {SdkProvider} from './lib/api/aws-auth'

console.log("asdf")


function parseCommandLineArguments(){
  //constinitTemplateLanguages = await availableInitLanguages();
  return yargs
    .env("CDK")
}

let a = parseCommandLineArguments()
console.log(typeof(a));
console.log(JSON.stringify(a))
