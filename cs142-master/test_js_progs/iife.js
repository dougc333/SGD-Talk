const obj = {};

(function() {
  let fs = require('fs');
  let vm = require('vm');
  // Build an emulation of the browser's script tag processing where everything is in a global
  // space and goes under the name window.

  global.window = global;
  obj.test = function(){
      //console.log(global);
      console.log('*********** Running cs142 Project #2 tests ***********');
      let startingGlobalProperties = Object.keys(global);
      processScriptFromFile('./cs142-make-multi-filter.js');
      processScriptFromFile('./cs142-template-processor.js');
      processScriptFromFile('./cs142-test-project2.js');
      let p1Message = global.cs142Project2Results.p1Message;
      let p2Message = global.cs142Project2Results.p2Message;
      let p3Message = global.cs142Project2Results.p3Message;

      let testWorked =  (p1Message === 'SUCCESS') &&  (p2Message === 'SUCCESS') &&
      (p3Message === 'SUCCESS');

      console.log('*********** Running cs142 Project #2 tests ***********:',
      testWorked ? 'Success' : 'Fail');
      let endingGlobalProperties = Object.keys(global);

      let arrayDiff = function(a,b) {
        return b.filter(function(i) {return a.indexOf(i) < 0;}).concat(a.filter(function(i) {return b.indexOf(i) < 0;}));
      };

     process.exit(Number(!testWorked));  // For npm: Return process status code 0 on success, 1 on failure.
  }
  

  /**
   * processScriptFromFile - Emulate the effects of a script tag in the browser by running the
   * contents of the file as a script with its scope being the global object.
   * @param {string} filename - File name of script to load and run.
   */
  function processScriptFromFile(filename) {
    // Warning: Ugly, un-Node.js-like code warning:
    // In order to emulate the browser JavaScript environment we need to undo the default isolation
    // in node modules. By directly calling into the Node.js vm.Script() API we can have
    // all the JavaScripts files run in the same context like on the browser.
    try {
        new vm.Script(fs.readFileSync(filename).toString(), {filename: filename}).runInThisContext();
    } catch (err) {
        // fs.readFileSync communicates errors using exceptions. We log but otherwise ignore errors
        console.error('Error processing', filename, ':', err.message);
    }
  }

  
  let a = 1;
  obj.t = function() {
    console.log(a);
    a += 1;
  };
})();

obj.t();
obj.test();