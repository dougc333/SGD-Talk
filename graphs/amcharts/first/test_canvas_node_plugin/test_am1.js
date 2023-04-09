import * as am5 from '@amcharts/amcharts5'
import { Root } from '@amcharts/amcharts5'
import * as am5xy from "@amcharts/amcharts5/xy"
import { XYChart } from '@amcharts/amcharts5/xy'

export function makeChart(){
  const root = Root.new("chartdiv")
  const xy_chart = XYChart.new(root(),{
    panX: false,
    panY: false,
    wheelX: "panX", ,
    wheelY: "zoomX",
  })
  const chart = root.container.children.push(xy_chart)
  
  return {root,chart}
}