import React from "react"
import ReactDOM from "react-dom"
import ProteinViewer from './src/viz/protein_viewer.jsx';

ReactDOM.render(
    <div>first div not a component</div>,
    <ProteinViewer></ProteinViewer>,
    document.getElementById("root")
)