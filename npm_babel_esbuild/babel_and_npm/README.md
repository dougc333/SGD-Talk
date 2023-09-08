babel intro

run babel directly from the command line. No webpack.config.js

npx babel <source file>

there are 3 files, 
1) basic map w arrow function in index.jx
npx babel src/index.js
2) a.js basic class
npx babel src/a.js
3) react.js which needs plugin in .babelrc
we dont need a webpack.config.js to run react, need .babelrc and the packages installed w/npm
npx babel src/react.js


npm run bb which puts all 3 files in src/ into build/
or 
./run.sh which outputs to stdout
./run_class.sh output babelized to stdout
./run_react.sh output babelized to stdout


To create this project:

npm init -y
npm install babel; --save-dev doesnt matter for this since we arent going into prod
index.js
// Babel Input: ES2015 arrow function
[1, 2, 3].map((n) => n + 1);

// Babel Output: ES5 equivalent
[1, 2, 3].map(function(n) {
  return n + 1;
});


