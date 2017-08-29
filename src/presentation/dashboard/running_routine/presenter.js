import React, { Component } from 'react'
import './styles.css'

import SensorChart from '../../common/sensor_chart'
import NavigationChart from './navigation_chart'
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

        <div className='cardRow'>
          <SensorChart
            title='Temperatura'
            value='temp'
            valueUnit='ºC'
            currentValue={this.props.currentValue.temp}
            data={this.props.temperatureTimeline}
          />
        </div>
        <div className='cardRow'>
          <SensorChart
            title='pH'
            value='ph'
            valueUnit=''
            currentValue={0}
            data={{ labels: this.props.temperatureTimeline.labels, values: this.props.temperatureTimeline.labels.map(l => 0) }}
          />
          <SensorChart
            title='Agitación'
            value='density'
            valueUnit='rpm'
            currentValue={0}
            data={{ labels: this.props.temperatureTimeline.labels, values: this.props.temperatureTimeline.labels.map(l => 0) }}
          />
        </div>

        <NavigationChart />

      </div>
    )
  }
}
