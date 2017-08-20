import React, { Component } from 'react'
import './styles.css'

import SensorChart from '../sensor_chart'
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

        <div className='row'>
          <SensorChart
            title='Temperatura'
            valueUnit='ºC'
            currentValue={this.props.currentValue.temp}
            data={this.props.temperatureTimeline}
          />
        </div>
        <div className='row'>
          <SensorChart
            title='pH'
            valueUnit=''
            currentValue={0}
            data={{ labels: this.props.temperatureTimeline.labels, values: this.props.temperatureTimeline.labels.map(l => 0) }}
          />
          <SensorChart
            title='Agitación'
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
