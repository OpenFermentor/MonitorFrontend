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
              { data: this.props.timeline.temp, stroke: '#F27C21', label: 'Temperatura' },
              { data: this.props.timeline.co2, stroke: '#6DE6AC', label: 'CO2' },
              { data: this.props.timeline.ph, stroke: '#9D5BDB', label: 'pH' },
              { data: this.props.timeline.density, stroke: '#50AEF5', label: 'Transmitancia' }
            ]}
          />
        </div>
      </div>

    )
  }
}
