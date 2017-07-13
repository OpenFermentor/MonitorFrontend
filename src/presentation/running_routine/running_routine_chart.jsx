import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Line} from 'react-chartjs'

import {
  selectTemperatureTimeline
} from '../../core/redux/routine/selector'

class RunningRoutineChart extends Component {
  render () {
    const containerStyle = {
      marginTop: 25,
      height: 530,
      padding: 15,
      backgroundColor: 'white',
      border: '1px solid #979797'
    }

    const lineStyle = {
      showLine: true,
      label: 'Temperatura',
      fill: false,
      lineTension: 0.1,
      borderColor: 'rgba(0, 0, 0, 0.9)',
      data: this.props.tempTimeline.data
    }

    const lineData = {
      labels: this.props.tempTimeline.labels,
      datasets: [
        lineStyle
      ]
    }

    return (
      <div style={containerStyle}>
        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: 800 }}>
          <Line data={lineData} width='800' height='480' />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tempTimeline: selectTemperatureTimeline(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(RunningRoutineChart)
