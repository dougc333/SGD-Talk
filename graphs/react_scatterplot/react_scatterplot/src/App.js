import './App.css';
import {d3} from 'd3'
import {scaleLinear} from 'd3-scale';
import { useState, useRef, useEffect} from 'react';

// setup container = set width/height of parent element to svg. 
// setup scaling


function App() {
  const [data] = useState([
    [90,20],
    [10,20],
    [66,44],
    [22,90],
    [30,155],
    [2,200],
  ])
  const svgRef = useRef()

  useEffect(()=>{
    const w = 400
    const h = 300
    const svg = d3.select(svgRef.current)
       .attr('width', w)
       .attr('height', h)
       .style('overflow', 'visible')
       .style('margin-top','100px')
    const xScale = d3.scaleLinear()
      .domain([0,100])
      .range([0,w])
    const yScale = d3.scaleLinear()
      .domain([0,200])
      .range([h,0])
    
  // setup axes
    const xAxis = d3.axisBottom(xScale).ticks(data.length)
    const yAxis = d3.axisLeft(yScale).ticks(10)

    svg.append('g')
    .call(xAxis)
    .attr('transform',`translate(0,${h})`)

    svg.append('g')
    .call(yAxis)
  
  // setup axis labels
    svg.append('text')
    .attr('x',w/2)
    .attr('y',h+50)
    .text('x')

    svg.append('text')
    .attr('y',h/2)
    .attr('x', -50)
    .text('y')
  
  // setup svg data
  svg.selectAll()
  .data(data)
  .enter()
  .append('circle')
  .attr('cx',d=>xScale(d[0]))
  .attr('cy',d=>yScale(d[1]))
  .attr('r',3)

  },[data])
  
 
  return (
    <div className="App">
    <svg ref={svgRef}></svg>
    </div>
  );
}

export default App;
