import React, { Component } from 'react'
import './styles.css'

import SensorChart from '../../common/sensor_chart'
import NavigationChart from './navigation_chart'
import Alerts from '../alerts'
import Toolbar from '../../common/toolbar'

export default class SensorsDashboardPresenter extends Component {
  render () {
    return (
      <div className='dashboard'>

        <Toolbar
          title={this.props.routineTitle}
          rightTitle='Finalizar'
          onClickRight={this.props.onRoutineStop}
        />

        <Alerts />

        <div className='cardRow'>
          <SensorChart
            title='Temperatura'
            value='temp'
            valueUnit='ºC'
            currentValue={this.props.currentValue.temp}
            data={this.props.timeline}
          />
        </div>
        <div className='cardRow'>
          <SensorChart
            title='pH'
            value='ph'
            valueUnit=''
            currentValue={0}
            data={this.props.timeline}
          />
        </div>
        <div className='cardRow'>
          <SensorChart
            title='Agitación'
            value='density'
            valueUnit='rpm'
            currentValue={0}
            data={this.props.timeline}
          />
        </div>

        <NavigationChart />

      </div>
    )
  }
}
