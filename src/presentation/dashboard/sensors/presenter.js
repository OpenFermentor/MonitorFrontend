import React, { Component } from 'react'

import SensorChart from '../../common/sensor_chart'
import Toolbar from '../../common/toolbar'
import Alerts from '../alerts'
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

        <Alerts />

        <div className='cardRow'>
          <RoutineSelection />
        </div>

        <div className='cardRow'>
          <SensorChart
            title='Temperatura'
            value='temp'
            valueUnit='ºC'
            currentValue={this.props.lastValue.temp}
            data={this.props.timeline}
          />
        </div>
        <div className='cardRow'>
          <SensorChart
            title='pH'
            value='ph'
            valueUnit=''
            currentValue={this.props.lastValue.ph}
            data={this.props.timeline}
          />
        </div>
        <div className='cardRow'>
          <SensorChart
            title='Agitación'
            value='density'
            valueUnit=''
            currentValue={this.props.lastValue.density}
            data={this.props.timeline}
          />
        </div>

      </div>
    )
  }
}
