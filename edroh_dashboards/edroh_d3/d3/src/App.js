import './App.css';
import * as d3 from 'd3';
import React,{useState, useEffect, useRef} from 'react'


function App() {
  const [data] = useState([3,4,6,20,35,55,100])
  const svgRef = useRef()

  useEffect(()=>{
    //setup svg
    const w = 400;
    const h = 100;
    const svg = d3.select(svgRef.current)
    .attr('width', w)
    .attr('height', h)
    .style('background','#d3d3d3')
    .style('margin-top', '100')
    .style('overflow', 'visible')
    //setup scaling
    const xScale = d3.scaleLinear()
                  .domain([0,data.length-1])
                  .range([0,w])
    const yScale = d3.scaleLinear().domain([0,h]).range([h,0])
    //axix
    const genScaleLine = d3.line()
                      .x((d,i)=>xScale(i))
                      .y(yScale)
                      .curve(d3.curveCardinal)
    const xAxis = d3.axisBottom(xScale).ticks(data.length).tickFormat(x=>x+1)
    const yAxis = d3.axisLeft(yScale).ticks(5)
    svg.append('g')
      .call(xAxis)
      .attr('transform',`translate(0,${h})`)
      svg.append('g')
      .call(yAxis)
      
    
      
    //data 
    svg.selectAll('.line').data([data]).join('path').attr('d',d=>genScaleLine(d))
    .attr('fill', 'none')
    .attr('stroke', 'black')

  },[data])

  return ( 
    <div className="App">
      <svg ref={svgRef}  />
    </div>
  );
}

export default App;
