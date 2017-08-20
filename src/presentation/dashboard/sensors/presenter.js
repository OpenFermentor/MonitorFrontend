import React, { Component } from 'react'

import SensorChart from '../sensor_chart'
import Toolbar from '../../common/toolbar'
import RoutineSelection from './routine_selection'

export default class SensorsDashboardPresenter extends Component {
  render () {
    return (
      <div className='dashboard'>

        <Toolbar
          title='En espera'
          rightTitle='Experimentos'
          onClickRight={this.props.onNavigateToExperiments}
        />

        <div className='row'>
          <SensorChart
            title='Temperatura'
            valueUnit='ºC'
            currentValue={this.props.lastValue.temp}
            data={this.props.temperatureTimeline}
          />
        </div>
        <div className='row'>
          <SensorChart
            title='pH'
            valueUnit=''
            currentValue={0}
            data={{ labels: this.props.temperatureTimeline.labels }}
          />
          <SensorChart
            title='Agitación'
            valueUnit='rpm'
            currentValue={0}
            data={{ labels: this.props.temperatureTimeline.labels }}
          />
        </div>

        <div className='row'>
          <RoutineSelection />
        </div>

      </div>
    )
  }
}
