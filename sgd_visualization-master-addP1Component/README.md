

Do not use npm install. This will update package-lock.json and on the next run npm will be confused between lock-version 1 and lock-version 2.  

npm ci
npm i https://github.com/biojs/sniper --save 
./node_modules/.bin/browserify lib/index.js -o build/index.js
npm run watch
npm run sniper

before viewing localhost:9090/examples
clear the google chrome browser cache. 



Create the following files, simple P1 componwent

examples/p1.html
<style>
    .body{
        background-color: orange;
    }
</style>
<div id="target"></div>




examples/p1.js
"use strict";
var P1 = require("sgd_visualization").P1;


var p1 = new P1({
    el: document.getElementById("target"),
    config:{
        name:"bob"
    }
})


The repo is missing a react and react-dom import. Add these here and add P1 component
src/index.js

import _P1Component from './viz/P1.jsx'

import React from "react"
import ReactDOM from "react-dom"

class _P1{
	constructor(options){
		console.log("_P1 ctor being called")
		//do we need this for the compoinent to render? 
		if (typeof options === "undefined") options = {};
		options.el = options.el || document.body;

		ReactDOM.render(React.createElement(_P1Component,{
			name:"p1 name"
		}), options.el);
	}

}

export {
	_P1 as P1,
	_ProteinViewer as ProteinViewer,
	_VariantViewer as VariantViewer,
	_ProteinViewerComponent as ProteinViewerComponent,
	_VariantViewerComponent as VariantViewerComponent,
	_P1Component as P1Component,
};





src/sgd_visualization.js









