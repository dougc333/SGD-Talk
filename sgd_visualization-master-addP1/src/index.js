"use strict";

import _ProteinViewerComponent from './viz/protein_viewer.jsx';
import _VariantViewerComponent from './viz/variant_viewer/variant_viewer.jsx';
import _P1Component from './viz/P1.jsx'

import React from "react"
import ReactDOM from "react-dom"

var exampleData = require("./variant_viewer_fixture_data.json");

class _VariantViewer {
	constructor(options) {
		if (typeof options === "undefined") options = {};
		options.el = options.el || document.body;

		var conf = (options.config === "fixture") ? exampleData : options.config;
		var _alignedDnaSequences = conf.alignedDnaSequences;
		var _alignedProteinSequences = conf.alignedProteinSequences;
		var _variantDataDna = conf.variantDataDna;
		var _variantDataProtein = conf.variantDataProtein;
		var _chromStart = conf.chromStart;
		var _chromEnd = conf.chromEnd;
		var _blockStarts = conf.blockStarts;
		var _blockSizes = conf.blockSizes;
		var _name = conf.name;
		var _contigName = conf.contigName;
		var _contigHref = conf.contigHref;
		var _dnaLength = conf.dnaLength;
		var _proteinLength = conf.proteinLength;
		var _strand = conf.strand;
		var _domains = conf.domains;
		var _isProteinMode = conf.isProteinMode;
		var _downloadCaption = conf.downloadCaption;
		var _isRelative = conf.isRelative;

		ReactDOM.render(React.createElement(_VariantViewerComponent, {
			name: _name,
			alignedDnaSequences: _alignedDnaSequences,
			alignedProteinSequences: _alignedProteinSequences,
			variantDataDna: _variantDataDna,
			variantDataProtein: _variantDataProtein,
			chromStart: _chromStart,
			chromEnd: _chromEnd,
			blockStarts: _blockStarts,
			blockSizes: _blockSizes,
			contigName: _contigName,
			contigHref: _contigHref,
			dnaLength: _dnaLength,
			proteinLength: _proteinLength,
			strand: _strand,
			domains: _domains,
			isProteinMode: _isProteinMode,
			downloadCaption: _downloadCaption,
			isRelative: _isRelative,
		}), options.el);
	}
};

class _ProteinViewer {
	constructor(options) {
		if (typeof options === "undefined") options = {};
		options.el = options.el || document.body;

		ReactDOM.render(React.createElement(_ProteinViewerComponent, {
			data: options.config.domains,
			locusData: options.config.locus
		}), options.el);
	}
}

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