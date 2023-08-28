const ReactDom = require("react-dom");
const React = require("react");
const ReactGrid = require("react-grid");


const Landing = require("./Landing");

var columns = [
  {
    key: 'id',
    name: 'ID',
    width: '20%',
    resizeable: true
  },
  {
    key: 'title',
    name: 'Title'
  },
  {
    key: 'count',
    name: 'Count',
    width: '20%'
  },
]

var rows = function(start, end) {
  var result = []
  for (var i = start; i < end; i++) {
    result.push({
      id: i,
      title: 'Title ' + i,
      count: i * 1000
    });
  }
  return result;
}


ReactDom.render(
<Landing />, 
document.getElementById("app")
);
