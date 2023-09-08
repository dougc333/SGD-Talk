
1) node.js server program uses const stuff=require("./stuff_lib")
this evolved independently of how broswer modules worked

Node.js introruced a new syntax to allow partitioning of large js files into modules. node.js used .mjs file suffixes to denote ECMAScript modules vs. common jsfiles .js. 

2) browsers use .js and also support modules! the lifecycle for broswer js is different than a nodejs server application. Browsers used npm for bundling, tree shaking and babel for polyfill for supporting newer language features on older browsers. 


-- tree shaking applies to both browsers and servers to optimize memory usage.







https://craigtaub.dev/under-the-hood-of-web-bundlers
