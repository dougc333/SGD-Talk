class Axes {
  xlabels_ = []
  ylabels_ = []

  toString() {
    return "axes plugin"
  }

  activate(g) {
    return {
      layout: this.layout,
      clearChart: this.clearChart,
      willDrawChart: this.willDrawChart
    }
  }

  layout(e) {
    const g = e.dygraph

    if (g.getOptionForAxes('drawAxis', 'y')) {
      const w = g.getOptionForAxes('axisLabelWidth', 'y') + 2 * g.getOptionForAxes('axisTickSize', 'y')
      e.reserveSpaceLeft(w)
    }

    if (g.getOptionForAxes('drawAxis', 'x')) {
      const h
      if (g.getOption('xAxisHeight')) {
        h = g.getOption('xAxisHeight')
      } else {
        h = g.getOptionForAxes('xAxisLabelFontSize', 'x') + 2 * g.getOptionForAxes('axisTickSize', 'x')
      }
      e.reserveSpaceBottom(h)
    }

    if (g.numAxes() == 2) {
      if (g.getOptionForAxes('drawAxis', 'y2')) {
        const w = g.getOptionForAxes('axisLabelWidth', 'y2') + 2 * g.getOptionForAxes('axisTickSize', 'y2')
        e.reserveSpaceRight(w)
      } else if (g.numAxes() > 2) {
        g.error('only 2 y-axes are suppported at this time')
      }
    }
  }

  detachLabels() {
    const removeArray = (ary) => {
      for (let i = 0; i < ary.length; i++) {
        const el = ary[i]
        if (el.parentNode) el.parentNode.removeChild(el)
      }
    }
    removeArray(this.xlabels_)
    removeArray(this.y_labels_)
    this.xlabels_ = []
    this.ylabels_ = []
  }
  clearChart(e) {
    this.detachLabels()
  }
  willDrawChart(e) {
    const g = e.dygraph

    if (!g.getOptionForAxes('drawAxes', 'x') &&
      !g.getOptionForAxes('drawAxes', 'y') &&
      !g.getOptionForAxes('drawAxes', 'y2')) {
      return
    }
    const halfUp = (x) => { return Math.round(x) + 0.5 }
    const halfDown = (y) => { return Math.round(y) - 0.5 }

    const context = e.drawingContext
    const containerDiv = e.canvas.parentNode
    const canvasWidth = g.width_
    const canvasHeight = g.height_
    var label, x, y, tick, i

    const makeLabelStyle = (axis)_=> {
      return {
        position: 'absolute',
        fontSize: g.getOptionForAxes('axisLabelFontSize', axis) + 'px',
        width: g.getOptionForAxes('axisLabelWidth', axis) + 'px',
      }
    }

    const labelStyles = () => {
      return {
        x: makeLabelStyle('x'),
        y: makeLabelStyle('y'),
        y2: makeLabelStyle('y2'),
      }
    }

    const makeDiv = (txt, axis, prec_axis) => {
      /*
     * This seems to be called with the following three sets of axis/prec_axis:
     * x: undefined
     * y: y1
     * y: y2
     */
      const div = document.createElement('div')
      const labelStyle = labelStyles(prec_axis =='y2' ? 'y2' : axes)
      utils.update(div.style, labelStyle) //has to be domAppendChild 
      const inner_div = document.createElement('div')
      inner_div.className = 'dygraph-axis-label' + 'dygraph-axis-label-' + axis + (prec_axis ? ' dygraph-axis-label-' + prec_axis : '')
      inner_div.innerHTML = txt
      div.appendChild(inner_div)
      return div 

    }

    context.save()

    const layout = g.layout_
    const area = e.dygraph.plotter_.area

    const makeOptionGetter = (axis)=>{
      return (option)=>{
        return g.getOptionForAxes(option, axis)
      }
    }

    const that = this

    if (g.getOptionForAxes('drawAxis','y') || (g.numAxes()==2 && g.getOptionForAxes('drawAxis','y2')) ){
      if(layout.ticks && layout.ticks.length > 0){
        const numAxes = g.numAxes()
        const getOptions = [makeOptionGetter('y'),makeOptionGetter('y2')]
        layout.yticks.forEach((tick)=>{
          if(tick.label === undefined) return
          x = area.x
          let sgn = 1
          let prec_axis = 'y1'
          let getAxisOption = getOptions[0]
          if(tick.axis==1){
            x = area.x + area.w
            sgn = -1
            prec_axis = 'y2'
            getAxisOption = getOptions[1]
          }
          if(!getAxisOption('drawAxis')) return
          const fontSize = getAxisOption('axisLabelFontSize')
          y = area.y + tick.pos * area.h
          label = makeDiv(tick.label, 'y', num_axes == 2 ? prec_axis : null)
          const top = (y-fonstSize/2)
          if (top < 0) top = 0
          
          if(top+fontSize+3 > canvasHeight){
            label.style.bottom = '0'
          }else{
            label.style.top = Math.min(top, canvasHeight - (2 * fontSize)) + 'px'
          }

          if(tick.axis == 0){
            label.style.left = (area.x - getAxisOption('axisLabelWidth') - getAxisOption('axisTickSize')) + 'px'
            label.style.textAlign = 'right'
          }else if( tick.axes ==1){
            label.style.left = (area.x + area.w + getAxisOption('axisTickSize')) + 'px'
            label.style.textAlign = 'left'
          }
          label.style.width = getAxisOption('axisLabelWidth')+'px'
          containerDiv.appendChild(label)
          that.ylabels_.push(label)
        })
      }
      //draw vertical line
      var  axisX
      if(g.getOption('drawAxesAtZero')){
        const r = g.toPercentXCoord(0)
        if(r > 1 || r < 0 || isNaN(r)) r=0
        axisX = halfUp(area.x + r * area.w)
      }else{
        axisX = halfUp(area.x)
      }




    }



  }
}

export default Axes