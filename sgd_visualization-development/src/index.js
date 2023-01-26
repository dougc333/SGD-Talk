"use strict";
var React = require("react");

var _ProteinViewerComponent = require("./viz/protein_viewer.jsx");
var _VariantViewerComponent = require("./viz/variant_viewer/variant_viewer.jsx");

var exampleData = require("./variant_viewer_fixture_data");

class _VariantViewer {
	constructor (options) {
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

		React.render(React.createElement(_VariantViewerComponent, {
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
	constructor (options) {
		if (typeof options === "undefined") options = {};
		options.el = options.el || document.body;

		React.render(React.createElement(_ProteinViewerComponent, {
			data: options.config.domains,
			locusData: options.config.locus
		}), options.el);
	}
}

module.exports = {
	ProteinViewer: _ProteinViewer,
	VariantViewer: _VariantViewer,
	ProteinViewerComponent: _ProteinViewerComponent,
	VariantViewerComponent: _VariantViewerComponent
};
