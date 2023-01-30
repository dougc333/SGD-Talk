convert to es modules.
webserver.js 
P1 component working
protein_viewer component working

lib/index.js no longer is relevant
src/index.js is no longer relevant
src/sgd_visualization.js is no longer relevant
examples/*.html and *.js are no longer relevant or correct. Remove sniper for webserver.js
build/index.js is no longer relevant, sniper convention
build/sgd_visualization.js no longer relevant. sniper convention

1 compoent shows what works under this version of package-lock.json versions. unknown before testing

modify webpack.config to get rid of sniper, modify the entry points to support bundles for each project
remove the data file and put into window variable

remove browserify
remove sniper

npm ci
npm i express --save


make sure to put bundle.js after the div id=root or will get error message below: 

React Uncaught Error: Target container is not a DOM element
