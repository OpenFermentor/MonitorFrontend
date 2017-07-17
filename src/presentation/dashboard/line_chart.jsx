import React, { Component } from 'react'
import { Line } from 'react-chartjs'

export default class LineChart extends Component {
  render () {
    const containerStyle = {
      marginTop: 25,
      height: 530,
      padding: 15,
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: 8
    }

    const lineData = {
      labels: this.props.temperatureTimeline.labels,
      datasets: [
        {
          label: 'My First dataset',
          fillColor: 'rgba(33, 133, 208, 0)',
          strokeColor: 'rgba(33, 133, 208, .5)',
          pointColor: 'rgba(33, 133, 208, 1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: this.props.temperatureTimeline.data
        }
      ]
    }

    return (
      <div style={containerStyle}>
        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: 900 }}>
          <Line data={lineData} width='800' height='480' />
        </div>
      </div>
    )
  }
}
