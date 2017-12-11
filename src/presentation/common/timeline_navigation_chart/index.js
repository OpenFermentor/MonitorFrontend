import React, { Component } from 'react'
import './styles.css'
import LineChart from '../chart/line'
import DraggableHandler from './draggable_handle'

const CHART_PADDING = 0

export default class TimelineNavigationChart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      elementWidth: 0
    }
  }

  componentDidMount () {
    this.setState({ elementWidth: this.container.offsetWidth })
  }
  onRangeChange ({ start, end }) {
    this.props.onRangeChange({
      start: start / (this.container.offsetWidth + CHART_PADDING),
      end: end / (this.container.offsetWidth + CHART_PADDING)
    })
  }

  render () {
    return (
      <div className='timelineNavigationChart'>
        <div className='wrapper' ref={ref => { this.container = ref }}>
          <div className='handler'>
            <DraggableHandler
              endPosition={this.state.elementWidth}
              onRangeChange={this.onRangeChange.bind(this)}
            />
          </div>
          <LineChart
            height={20}
            labels={this.props.timeline.labels}
            showYAxis={false}
            datasets={[
              { data: this.props.timeline.temp, stroke: '#DB9439', label: 'Temperatura' },
              { data: this.props.timeline.ph, stroke: '#8DB5B2', label: 'pH' },
              { data: this.props.timeline.product, stroke: '#C6625B', label: 'Product' },
              { data: this.props.timeline.substratum, stroke: '#739E53', label: 'Sustrato' },
              { data: this.props.timeline.biomass, stroke: '#A37EA0', label: 'Biomasa' }
            ]}
          />
        </div>
      </div>

    )
  }
}
