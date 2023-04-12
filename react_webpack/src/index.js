import { Root } from "@amcharts/amcharts5/.internal/core/Root";
import { XYChart } from "@amcharts/amcharts5/xy";
import { ValueAxis, LineSeries} from "@amcharts/amcharts5/xy"
import {AxisRendererX} from "@amcharts/amcharts5/.internal/charts/xy/axes/AxisRendererX"
import {AxisRendererY} from "@amcharts/amcharts5/.internal/charts/xy/axes/AxisRendererY"
import {ready} from "@amcharts/amcharts5/index"

ready(function(){
const root = Root.new("chartdiv");
//root.setThemes([
//  am5themes_Animated.new(root)
//]);
const chart = root.container.children.push(XYChart.new(root, {})); 

const data = [{  
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
//create axes 
const xAxis = chart.xAxes.push(ValueAxis.new(root, {
  renderer: AxisRendererX.new(root, {}),
})) //end xAxis
  
const yAxis = chart.yAxes.push(ValueAxis.new(root, {
  renderer: AxisRendererY.new(root, {})
})) //end yAxis

//create series to match data to graph
const series = chart.series.push(LineSeries.new(root, {
  name: "Series",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "x1",
  valueXField: "y1",
  })) //end series
  
  // Set data
  series.data.setAll(data);   
})d