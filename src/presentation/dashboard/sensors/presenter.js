import React, { Component } from 'react'

import SensorChart from '../../common/sensor_chart'
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

        <div className='cardRow'>
          <SensorChart
            title='Temperatura'
            value='temp'
            valueUnit='ºC'
            currentValue={this.props.lastValue.temp}
            data={this.props.temperatureTimeline}
          />
        </div>
        <div className='cardRow'>
          <SensorChart
            title='pH'
            value='ph'
            valueUnit=''
            currentValue={0}
            data={{ labels: this.props.temperatureTimeline.labels }}
          />
          <SensorChart
            title='Agitación'
            value='density'
            valueUnit=''
            currentValue={0}
            data={{ labels: this.props.temperatureTimeline.labels }}
          />
        </div>

        <div className='cardRow'>
          <RoutineSelection />
        </div>

      </div>
    )
  }
}
