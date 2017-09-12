import React, { Component } from 'react'
import HttpService from '../../../core/networking'
import './styles.css'

import SensorChart from '../../common/sensor_chart'
import NavigationChart from './navigation_chart'
import Toolbar from '../../common/toolbar'

export default class RoutineDetails extends Component {
  render () {
    if (!this.props.routine) {
      return
    }
    return (

      <div className='routineDetails'>

        <Toolbar
          title={this.props.routine.title}
          rightTitle='Volver'
          onClickRight={this.props.onCancel}

          secondRightTitle='Exportar a CSV'
          secondRightDownloadUrl={HttpService.routineToCsvUrl(this.props.routine)}
        />

        <div className='content'>

          <SensorChart
            title='Temperatura'
            valueUnit='ºC'
            data={this.props.timeline}
            value='temp'
          />
          <SensorChart
            title='pH'
            value='ph'
            data={this.props.timeline}
          />
          <SensorChart
            title='Transmitancia'
            value='density'
            data={this.props.timeline}
          />

          <NavigationChart />

        </div>
      </div>
    )
  }
}
