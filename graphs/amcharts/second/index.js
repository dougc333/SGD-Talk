import { Root } from "@amcharts/amcharts5/.internal/core/Root";
import { Scrollbar } from "@amcharts/amcharts5/.internal/core/render/Scrollbar";
import { Tooltip} from "@amcharts/amcharts5/.internal/core/render/Tooltip";
//import { Series } from "@amcharts/amcharts5/.internal/core/render/Series";
import { XYChart } from "@amcharts/amcharts5/xy";
import {XYCursor} from "@amcharts/amcharts5/xy"
import {AxisRendererX , AxisRendererY, ValueAxis, LineSeries} from "@amcharts/amcharts5/xy"


let root = Root.new("chartdiv");
let chart = root.container.children.push(
  XYChart.new(root, {
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX",
    pinchZoomX: true
  })
);

var cursor = chart.set("cursor", XYCursor.new(root, {
  behavior: "none"
}));
cursor.lineY.set("visible", false);

var data = [{
  x1: 1000,
  y1: 588,
  value: 3,
}, {
  x1: 1200,
  y1: 1800,
  value: 3,
}, {
  x1: 850,
  y1: 1230,
  value: 3,
}];

var xAxis = chart.xAxes.push(ValueAxis.new(root, {
  renderer: AxisRendererX.new(root, {}),
})) //end xAxis

var yAxis = chart.yAxes.push(ValueAxis.new(root, {
  renderer: AxisRendererY.new(root, {})
})) //end yAxis

var series = chart.series.push(LineSeries.new(root, {
  name: "Series",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "x1",
  valueXField: "y1",
  tooltip: Tooltip.new(root, {
    labelText: "{valueY}"
  })
})) //end series

chart.set("scrollbarX", Scrollbar.new(root, {
  orientation: "horizontal"
}));

// Set data
series.data.setAll(data);  