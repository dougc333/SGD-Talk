const React = require("react");
const createReactClass = require("create-react-class");
const ReactJson = require("react-json-view").default;
const jsonData = require("./data");

function updateJson(data) {
  this.setState({ src: data.updated_src }, () => console.log(this.state));
}

function render() {
  return (
    <div>
      <ReactJson
        src={jsonData}
        onEdit={(data) => this.updateJson(data)}
        theme="harmonic"
      />
    </div>
  );
}

module.exports = createReactClass({ updateJson, render });
