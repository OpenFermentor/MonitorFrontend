import React, { Component } from 'react'
import { connect } from 'react-redux'
import AttributeStatusCard from './attribute_status_card'

import {
  selectRunningRoutineLastValue
} from '../../core/redux/routine/selector'

class RunningRoutine extends Component {
  render () {
    const containerStyle = {
      padding: 70,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '75%'
    }
    return (
      <div style={containerStyle}>
        <h1>Experimento en curso</h1>
        <AttributeStatusCard attribute='temp' value={this.props.lastReading.temp} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    lastReading: selectRunningRoutineLastValue(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(RunningRoutine)
