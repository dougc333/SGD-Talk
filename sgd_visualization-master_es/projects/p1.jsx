import React from "react"
import ReactDOM from "react-dom"
import TestComponent from "../src/components/TestComponent"

ReactDOM.render(
    <div>
        this is div before test component
        <TestComponent></TestComponent>
    </div>,
    document.getElementById("root")
)